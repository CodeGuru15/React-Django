from django.shortcuts import render, HttpResponseRedirect
from django.http import HttpResponse
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
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
    return HttpResponse('New task added successfully') 

def all_tasks(request):
  allData = Task.objects.all().values()
  json_data = json.dumps(list(allData), cls=DjangoJSONEncoder) 
  return HttpResponse(json_data)

def single_task(request, pk):
  return HttpResponse(f'Task with id {pk}')

def update_task(request,pk):
  if request.method == 'POST':
    select_task = Task.objects.get(id=pk)
    updated_details = request.body.decode('utf-8')
    select_task.details = updated_details
    select_task.save()
    return HttpResponse('Task has been updated')
