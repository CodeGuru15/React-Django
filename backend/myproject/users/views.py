from django.shortcuts import render
from django.http import HttpResponse

def all_users(request):
  return HttpResponse('Returning all users')

def single_users(request, id):
  return HttpResponse(f'User details of id {id}')
