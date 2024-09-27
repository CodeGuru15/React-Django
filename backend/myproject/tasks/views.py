from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from .models import Task
import datetime
import json


@csrf_exempt
def add_task(request):
  if request.method == 'POST':
    details = request.body.decode('utf-8')
    # Create a new Task instance and save it to the database
    new_task = Task(details=details)
    new_task.save()
    return HttpResponse('New task added successfully!') 

def all_tasks(request):
  if request.method == 'GET':
    allData = Task.objects.all().values()
    json_data = json.dumps(list(allData), cls=DjangoJSONEncoder) 
    return HttpResponse(json_data)

def single_task(request, pk):
  return HttpResponse(f'Task with id {pk}')

@csrf_exempt
def update_task(request,pk):
  if request.method == 'PUT':
    select_task = Task.objects.get(id=pk)
    updated_details = request.body.decode('utf-8')
    select_task.details = updated_details
    select_task.save()
    return HttpResponse('Task has been updated successfully!')
  
@csrf_exempt
def delete_task(request,pk):
  if request.method == 'DELETE':
    select_task = Task.objects.get(id=pk)
    select_task.delete()
    return HttpResponse('Task deleted successfully!')
  
@csrf_exempt
def search_task(request):
  if request.method == 'POST':
    search_text = request.body.decode('utf-8')
    search_task = Task.objects.filter(details__icontains = search_text).values()
    json_data = json.dumps(list(search_task), cls=DjangoJSONEncoder) 
    return HttpResponse(json_data)
