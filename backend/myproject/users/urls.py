from django.urls import path
from . import views

urlpatterns = [
  path('', views.all_users, name='all_users'),
  path('user<int:id>/', views.single_user, name='single_user')

]