from django.urls import path
from . import views

urlpatterns = [
  path('', views.all_tasks, name='all_tasks'),
  path('addtask/', views.add_task, name='add_task'),
  path('task<int:pk>/', views.single_task, name='single_task'),
  path('update<int:pk>/', views.update_task, name='update_task'),
  path('delete<int:pk>/', views.delete_task, name='delete_task'),
  path('search/', views.search_task, name='search_task'),

]