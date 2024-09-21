from django.db import models
from django.utils import timezone

# Create your models here.
class Task(models.Model):
  id = models.AutoField(primary_key=True)
  details = models.CharField(max_length=50)
  created = models.DateTimeField(default=timezone.now, editable=False)
  modified = models.DateTimeField(auto_now=True)

