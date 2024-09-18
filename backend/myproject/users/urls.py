from django.urls import path
from . import views

urlpatterns = [
  path('', views.all_users, name='all_users'),
  path('user/', views.single_users, name='single_users')

]