from django import forms
from .models import Category, Product, SaleInvoice, SaleInvoiceItem,DebtRecord

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name', 'description']
        labels = {
            'name': 'Category Name',
            'description': 'Description (Optional)'
        }

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'reserve_price', 'description','stock', 'minimum_stock']
        labels = {
            'name': 'Product Name',
            'price': 'Price',
            'reserve_price': 'Reserve Price',
            'description': 'Description (Optional)',
            'stock': 'Quantity in Stock',

        }

class SaleInvoiceForm(forms.ModelForm):
    PAYMENT_CHOICES = (
        (True, 'Cash'),
        (False, 'Credit'),
    )
    is_cash = forms.ChoiceField(choices=PAYMENT_CHOICES, widget=forms.RadioSelect, label='Payment Type')


    class Meta:
        model = SaleInvoice
        fields = ['buyer_name', 'is_cash', 'debt_amount']
        labels = {
            'buyer_name': 'Buyer Name',
            'debt_amount': 'Debt Amount (if Credit)',
        }


class SaleInvoiceItemForm(forms.ModelForm):
    class Meta:
        model = SaleInvoiceItem
        fields = ['product', 'quantity']
        labels = {
            'product': 'Product',
            'quantity': 'Quantity'
        }


class DebtPaymentForm(forms.ModelForm):
    class Meta:
        model = DebtRecord
        fields = ['paid_amount']
        labels = {
            'paid_amount': 'Amount Paid'
        }


class ProductStockUpdateForm(forms.Form):
    additional_stock = forms.IntegerField(min_value=1, label="Additional Quantity")