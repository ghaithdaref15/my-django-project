from django.db.models import Sum, Count, F, Q, Avg, Max, Min
from django.utils import timezone
from datetime import timedelta
from .models import Product, SaleInvoice, SaleInvoiceItem, DebtRecord, Customer, Category
import json

def get_dashboard_stats():
    """
    Collect comprehensive statistics for the dashboard
    """
    # Get today's date
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    month_ago = today - timedelta(days=30)
    
    # Total sales today
    today_sales = SaleInvoice.objects.filter(
        date__date=today
    ).aggregate(total=Sum('total_price'))['total'] or 0
    
    # Weekly sales
    weekly_sales = SaleInvoice.objects.filter(
        date__date__gte=week_ago,
        date__date__lte=today
    ).aggregate(total=Sum('total_price'))['total'] or 0
    
    # Monthly sales
    monthly_sales = SaleInvoice.objects.filter(
        date__date__gte=month_ago,
        date__date__lte=today
    ).aggregate(total=Sum('total_price'))['total'] or 0
    
    # Total number of products in inventory
    total_products = Product.objects.count()
    
    # Total categories
    total_categories = Category.objects.count()
    
    # Total customers
    total_customers = Customer.objects.count()
    
    # Low stock products (less than 5 pieces)
    low_stock_threshold = 5
    low_stock_count = Product.objects.filter(stock__lt=low_stock_threshold).count()
    
    # Total outstanding debts
    total_debt = DebtRecord.objects.filter(
        total_amount__gt=F('paid_amount')
    ).aggregate(
        remaining=Sum(F('total_amount') - F('paid_amount'))
    )['remaining'] or 0
    
    # Total invoices
    total_invoices = SaleInvoice.objects.count()
    
    # Average invoice value
    avg_invoice_value = SaleInvoice.objects.aggregate(
        avg_value=Avg('total_price')
    )['avg_value'] or 0
    
    # Cash vs Credit sales
    cash_sales = SaleInvoice.objects.filter(is_cash=True).count()
    credit_sales = SaleInvoice.objects.filter(is_cash=False).count()
    
    return {
        'total_sales': today_sales,
        'weekly_sales': weekly_sales,
        'monthly_sales': monthly_sales,
        'total_products': total_products,
        'total_categories': total_categories,
        'total_customers': total_customers,
        'low_stock_count': low_stock_count,
        'total_debt': total_debt,
        'total_invoices': total_invoices,
        'avg_invoice_value': avg_invoice_value,
        'cash_sales': cash_sales,
        'credit_sales': credit_sales
    }

def get_top_products(limit=5, period='month'):
    """
    Get the best-selling products for a specific time period
    """
    # Set time period
    if period == 'week':
        time_ago = timezone.now() - timedelta(days=7)
    elif period == 'month':
        time_ago = timezone.now() - timedelta(days=30)
    elif period == 'year':
        time_ago = timezone.now() - timedelta(days=365)
    else:  # Default to all time
        time_ago = None
    
    # Build query
    query = SaleInvoiceItem.objects
    if time_ago:
        query = query.filter(invoice__date__gte=time_ago)
    
    # Get top products
    top_products = query.values('product__name', 'product__id').annotate(
        name=F('product__name'),
        product_id=F('product__id'),
        sales_count=Sum('quantity'),
        revenue=Sum(F('quantity') * F('product__price'))
    ).order_by('-sales_count')[:limit]
    
    return list(top_products)

def get_sales_chart_data(days=7, chart_type='daily'):
    """
    Get sales data for the chart with different time periods
    """
    # Get today's date
    today = timezone.now().date()
    
    if chart_type == 'daily':
        # Create a list of dates for previous days
        date_list = [today - timedelta(days=x) for x in range(days)][::-1]
        
        # Get total sales for each day
        sales_data = []
        for date in date_list:
            daily_sales = SaleInvoice.objects.filter(
                date__date=date
            ).aggregate(total=Sum('total_price'))['total'] or 0
            
            sales_data.append({
                'date': date.strftime('%Y-%m-%d'),
                'total': float(daily_sales)
            })
        
        return {
            'labels': [item['date'] for item in sales_data],
            'data': [item['total'] for item in sales_data]
        }
    
    elif chart_type == 'weekly':
        # Get data for the last 10 weeks
        weeks_data = []
        for i in range(10):
            start_date = today - timedelta(days=today.weekday() + 7 * i)
            end_date = start_date + timedelta(days=6)
            weekly_sales = SaleInvoice.objects.filter(
                date__date__gte=start_date,
                date__date__lte=end_date
            ).aggregate(total=Sum('total_price'))['total'] or 0
            
            weeks_data.append({
                'date': f'Week {i+1}',
                'total': float(weekly_sales)
            })
        
        weeks_data.reverse()
        return {
            'labels': [item['date'] for item in weeks_data],
            'data': [item['total'] for item in weeks_data]
        }
    
    elif chart_type == 'monthly':
        # Get data for the last 12 months
        months_data = []
        for i in range(12):
            month = today.month - i
            year = today.year
            if month <= 0:
                month += 12
                year -= 1
            
            month_start = timezone.datetime(year, month, 1).date()
            if month == 12:
                month_end = timezone.datetime(year + 1, 1, 1).date() - timedelta(days=1)
            else:
                month_end = timezone.datetime(year, month + 1, 1).date() - timedelta(days=1)
            
            monthly_sales = SaleInvoice.objects.filter(
                date__date__gte=month_start,
                date__date__lte=month_end
            ).aggregate(total=Sum('total_price'))['total'] or 0
            
            months_data.append({
                'date': month_start.strftime('%b %Y'),
                'total': float(monthly_sales)
            })
        
        months_data.reverse()
        return {
            'labels': [item['date'] for item in months_data],
            'data': [item['total'] for item in months_data]
        }
    
    # Default to daily
    return get_sales_chart_data(days, 'daily')

def get_alerts():
    """
    Get alerts to display on the dashboard
    """
    alerts = []
    
    # Low stock product alerts - using product-specific minimum stock levels
    low_stock_products = Product.objects.filter(stock__lt=F('minimum_stock'), stock__gt=0)
    
    for product in low_stock_products:
        alerts.append({
            'type': 'warning',
            'icon': 'exclamation-triangle',
            'message': f'Product "{product.name}" is low in stock (Remaining: {product.stock})',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'action_url': f'/product/update/{product.id}/',
            'action_text': 'Update Stock'
        })
    
    # Alerts for debts due for more than 30 days
    thirty_days_ago = timezone.now().date() - timedelta(days=30)
    overdue_debts = DebtRecord.objects.filter(
        date__lt=thirty_days_ago,
        total_amount__gt=F('paid_amount')
    )
    
    for debt in overdue_debts:
        alerts.append({
            'type': 'danger',
            'icon': 'bell',
            'message': f'Debt due for customer "{debt.customer.name}" for more than 30 days (Remaining: {debt.remaining_amount})',
            'date': debt.date.strftime('%Y-%m-%d'),
            'action_url': f'/debts/edit/{debt.id}/',
            'action_text': 'Update Payment'
        })
    
    # Out of stock products
    out_of_stock = Product.objects.filter(stock=0)
    for product in out_of_stock:
        alerts.append({
            'type': 'danger',
            'icon': 'exclamation-circle',
            'message': f'Product "{product.name}" is out of stock!',
            'date': timezone.now().strftime('%Y-%m-%d'),
            'action_url': f'/product/update/{product.id}/',
            'action_text': 'Restock'
        })
    
    # High value sales alert
    yesterday = timezone.now().date() - timedelta(days=1)
    avg_sale_value = SaleInvoice.objects.aggregate(avg=Avg('total_price'))['avg'] or 0
    high_value_threshold = avg_sale_value * 2  # Sales that are twice the average
    
    high_value_sales = SaleInvoice.objects.filter(
        date__date__gte=yesterday,
        total_price__gt=high_value_threshold
    )
    
    for sale in high_value_sales:
        alerts.append({
            'type': 'info',
            'icon': 'chart-line',
            'message': f'High value sale to {sale.buyer_name} ({sale.total_price})',
            'date': sale.date.strftime('%Y-%m-%d'),
            'action_url': f'/invoice/sale/edit/{sale.id}/',
            'action_text': 'View Details'
        })
    
    return alerts

def get_inventory_stats():
    """
    Get detailed inventory statistics
    """
    # Total inventory value
    inventory_value = Product.objects.annotate(
        value=F('stock') * F('price')
    ).aggregate(total=Sum('value'))['total'] or 0
    
    # Products by category
    categories = Category.objects.annotate(product_count=Count('products'))
    category_data = {
        'labels': [category.name for category in categories],
        'data': [category.product_count for category in categories]
    }
    
    # Stock distribution
    out_of_stock = Product.objects.filter(stock=0).count()
    low_stock = Product.objects.filter(stock__gt=0, stock__lt=5).count()
    normal_stock = Product.objects.filter(stock__gte=5).count()
    
    stock_distribution = {
        'labels': ['Out of Stock', 'Low Stock', 'Normal Stock'],
        'data': [out_of_stock, low_stock, normal_stock]
    }
    
    return {
        'inventory_value': inventory_value,
        'category_data': category_data,
        'stock_distribution': stock_distribution
    }

def get_customer_stats():
    """
    Get customer statistics
    """
    # Total customers
    total_customers = Customer.objects.count()
    
    # Customers with debt
    customers_with_debt = DebtRecord.objects.filter(
        total_amount__gt=F('paid_amount')
    ).values('customer').distinct().count()
    
    # Top customers by purchase amount
    top_customers = Customer.objects.annotate(
        total_purchases=Sum('debts__total_amount')
    ).order_by('-total_purchases')[:5]
    
    top_customer_data = {
        'names': [customer.name for customer in top_customers if customer.total_purchases],
        'values': [float(customer.total_purchases) for customer in top_customers if customer.total_purchases]
    }
    
    return {
        'total_customers': total_customers,
        'customers_with_debt': customers_with_debt,
        'top_customer_data': top_customer_data
    }

def get_profit_data(days=30):
    """
    Calculate profit data based on sales and reserve prices
    """
    # Get date range
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=days)
    
    # Get all invoice items in the date range
    invoice_items = SaleInvoiceItem.objects.filter(
        invoice__date__date__gte=start_date,
        invoice__date__date__lte=end_date
    )
    
    # Calculate total revenue and cost
    total_revenue = 0
    total_cost = 0
    
    for item in invoice_items:
        revenue = item.quantity * item.product.price
        cost = item.quantity * item.product.reserve_price
        total_revenue += revenue
        total_cost += cost
    
    # Calculate profit
    profit = total_revenue - total_cost
    profit_margin = (profit / total_revenue * 100) if total_revenue > 0 else 0
    
    return {
        'total_revenue': total_revenue,
        'total_cost': total_cost,
        'profit': profit,
        'profit_margin': profit_margin
    }

def get_dashboard_data():
    """
    Get all dashboard data in a single function call
    """
    data = {
        'stats': get_dashboard_stats(),
        'top_products': get_top_products(),
        'sales_chart_data': get_sales_chart_data(),
        'alerts': get_alerts(),
        'inventory_stats': get_inventory_stats(),
        'customer_stats': get_customer_stats(),
        'profit_data': get_profit_data()
    }
    
    return data