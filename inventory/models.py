from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Customer(models.Model):
    name = models.CharField(max_length=255, unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class SaleInvoice(models.Model):
    buyer_name = models.CharField(max_length=100)  # Buyer name
    # We use is_cash field to determine payment type:
    # True: Cash, False: Credit
    is_cash = models.BooleanField(default=True)
    debt_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Sale Invoice {self.id} - {self.buyer_name}"

class SaleInvoiceItem(models.Model):
    invoice = models.ForeignKey(SaleInvoice, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    def __str__(self):
        return f"{self.product.name} (x{self.quantity})"

class Product(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    reserve_price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    stock = models.PositiveIntegerField(default=0)
    minimum_stock = models.PositiveIntegerField(default=5, help_text="Minimum stock level before alert is triggered")
    
    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class DebtRecord(models.Model):
    customer = models.ForeignKey(Customer, related_name="debts", on_delete=models.CASCADE)
    invoice = models.ForeignKey(SaleInvoice, on_delete=models.CASCADE, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(auto_now_add=True)

    @property
    def remaining_amount(self):
        """Remaining debt amount"""
        return self.total_amount - self.paid_amount

    def __str__(self):
        return f"Debt for {self.customer.name} - Remaining: {self.remaining_amount}"

# Signal to automatically create a debt record when a non-cash sale invoice is created
@receiver(post_save, sender=SaleInvoice)
def create_debt_record(sender, instance, created, **kwargs):
    if created and not instance.is_cash:
        # Try to find the customer or create a new one
        customer, _ = Customer.objects.get_or_create(name=instance.buyer_name)
        DebtRecord.objects.create(
            customer=customer,
            invoice=instance,
            total_amount=instance.total_price,
            paid_amount=instance.debt_amount,
        )
