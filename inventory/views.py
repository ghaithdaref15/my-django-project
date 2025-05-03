from django.shortcuts import render, redirect, get_object_or_404
from .models import Category, Product, SaleInvoice, SaleInvoiceItem, DebtRecord, Customer
from .forms import CategoryForm, ProductForm, SaleInvoiceForm, SaleInvoiceItemForm,DebtPaymentForm,ProductStockUpdateForm
from django.forms import modelformset_factory
from .dashboard_utils import get_dashboard_stats, get_top_products, get_sales_chart_data, get_alerts,get_inventory_stats,get_customer_stats,get_profit_data
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta


def home(request):
    return render(request, 'inventory/home.html')

# Inventory page to display categories and products
def inventory_view(request):
    categories = Category.objects.all()
    query = request.GET.get('q')
    if query:
        # Simple product search
        products = Product.objects.filter(name__icontains=query)
    else:
        products = None
    return render(request, 'inventory/inventory.html', {'categories': categories, 'products': products})

# Page to add a new category
def add_category(request):
    if request.method == 'POST':
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('inventory')
    else:
        form = CategoryForm()
    return render(request, 'inventory/add_category.html', {'form': form})


def add_product(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            product = form.save(commit=False)
            product.category = category
            product.save()
            return redirect('inventory')
    else:
        form = ProductForm()
    return render(request, 'inventory/add_product.html', {'form': form, 'category': category})


def add_sale_invoice(request):
    # Here we set extra=1 to add 1 empty form (you can change the number)
    SaleInvoiceItemFormSet = modelformset_factory(SaleInvoiceItem, form=SaleInvoiceItemForm, extra=1)
    if request.method == 'POST':
        invoice_form = SaleInvoiceForm(request.POST)
        formset = SaleInvoiceItemFormSet(request.POST, queryset=SaleInvoiceItem.objects.none())
        if invoice_form.is_valid() and formset.is_valid():
            invoice = invoice_form.save(commit=False)
            total = 0
            invoice.save()
            for form in formset:
                if form.cleaned_data:
                    item = form.save(commit=False)
                    item.invoice = invoice
                    # Check if there is enough stock before deduction
                    product = item.product
                    if product.stock >= item.quantity:
                        product.stock -= item.quantity
                        product.save()
                        item.save()
                        total += product.price * item.quantity
                    else:
                        return render(request, 'inventory/add_sale_invoice.html', {
                            'invoice_form': invoice_form,
                            'formset': formset,
                            'error': f'Not enough stock for {product.name}'
                        })
            invoice.total_price = total
            invoice.save()
            return redirect('invoice_history')
    else:
        invoice_form = SaleInvoiceForm()
        formset = SaleInvoiceItemFormSet(queryset=SaleInvoiceItem.objects.none())
    return render(request, 'inventory/add_sale_invoice.html', {'invoice_form': invoice_form, 'formset': formset})


# Page to edit a sale invoice
def edit_sale_invoice(request, invoice_id):
    invoice = get_object_or_404(SaleInvoice, id=invoice_id)
    SaleInvoiceItemFormSet = modelformset_factory(SaleInvoiceItem, form=SaleInvoiceItemForm, extra=0)
    if request.method == 'POST':
        invoice_form = SaleInvoiceForm(request.POST, instance=invoice)
        formset = SaleInvoiceItemFormSet(request.POST, queryset=invoice.items.all())
        if invoice_form.is_valid() and formset.is_valid():
            invoice = invoice_form.save(commit=False)
            total = 0
            invoice.save()
            for form in formset:
                if form.cleaned_data:
                    item = form.save(commit=False)
                    item.invoice = invoice
                    item.save()
                    total += item.product.price * item.quantity
            invoice.total_price = total
            invoice.save()
            return redirect('inventory')
    else:
        invoice_form = SaleInvoiceForm(instance=invoice)
        formset = SaleInvoiceItemFormSet(queryset=invoice.items.all())
    return render(request, 'inventory/edit_sale_invoice.html', {'invoice_form': invoice_form, 'formset': formset, 'invoice': invoice})



def invoice_history(request):
    invoices = SaleInvoice.objects.all().order_by('-date')
    return render(request, 'inventory/invoice_history.html', {'invoices': invoices})



def debt_list(request):
    query = request.GET.get('q', '')
    if query:
        # Can search using customer name or any other field
        debts = DebtRecord.objects.filter(customer__name__icontains=query).order_by('-date')
    else:
        debts = DebtRecord.objects.all().order_by('-date')
    return render(request, 'inventory/debt_list.html', {'debts': debts, 'query': query})

def edit_debt(request, debt_id):
    """Edit payments for a specific debt record"""
    debt = get_object_or_404(DebtRecord, id=debt_id)
    
    if request.method == "POST":
        form = DebtPaymentForm(request.POST, instance=debt)
        if form.is_valid():
            form.save()
            return redirect('debt_list')
    else:
        form = DebtPaymentForm(instance=debt)
    
    return render(request, 'inventory/edit_debt.html', {'form': form, 'debt': debt})

def edit_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == "POST":
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('inventory')
    else:
        form = ProductForm(instance=product)
    return render(request, 'inventory/edit_product.html', {'form': form, 'product': product})




def update_product_stock(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == "POST":
        form = ProductStockUpdateForm(request.POST)
        if form.is_valid():
            additional_stock = form.cleaned_data['additional_stock']
            product.stock += additional_stock
            product.save()
            return redirect('inventory')
    else:
        form = ProductStockUpdateForm()
    return render(request, 'inventory/update_product_stock.html', {'form': form, 'product': product})


def dashboard(request):
    """Display the main dashboard with comprehensive statistics"""
    # Get chart type from request parameters (default to daily)
    chart_type = request.GET.get('chart_type', 'daily')
    time_period = request.GET.get('time_period', 'month')
    
    # Get basic statistics
    stats = get_dashboard_stats()
    
    # Get specific chart data based on user selection
    sales_chart_data = get_sales_chart_data(7, chart_type)
    
    # Get top products based on selected time period
    top_products = get_top_products(5, time_period)
    
    # Get inventory statistics
    inventory_stats = get_inventory_stats()
    
    # Get customer statistics
    customer_stats = get_customer_stats()
    
    # Get profit data
    profit_data = get_profit_data()
    
    # Get alerts
    alerts = get_alerts()
    
    context = {
        'total_sales': stats['total_sales'],
        'total_products': stats['total_products'],
        'low_stock_count': stats['low_stock_count'],
        'total_debt': stats['total_debt'],
        'weekly_sales': stats['weekly_sales'],
        'monthly_sales': stats['monthly_sales'],
        'top_products': top_products,
        'sales_chart_data': sales_chart_data,
        'alerts': alerts,
        'inventory_stats': inventory_stats,
        'customer_stats': customer_stats,
        'profit_data': profit_data
    }
    
    return render(request, 'inventory/dashboard.html', context)