from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('inventory/', views.inventory_view, name='inventory'),
    path('category/add/', views.add_category, name='add_category'),
    path('product/add/<int:category_id>/', views.add_product, name='add_product'),
    path('invoice/sale/add/', views.add_sale_invoice, name='add_sale_invoice'),
    path('invoice/sale/edit/<int:invoice_id>/', views.edit_sale_invoice, name='edit_sale_invoice'),
    path('invoices/', views.invoice_history, name='invoice_history'),
    path('debts/', views.debt_list, name='debt_list'),
    path('debts/edit/<int:debt_id>/', views.edit_debt, name='edit_debt'),
    path('product/update/<int:product_id>/', views.update_product_stock, name='update_product_stock'),
    path('product/edit/<int:product_id>/', views.edit_product, name='edit_product'),
]
