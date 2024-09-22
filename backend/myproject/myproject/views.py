from django.http import HttpResponse

# from django.shortcuts import render

def home(request):
  return HttpResponse('Welcome to Home Page')
  # return render(request , 'index.html')
  
def about(request):
  return HttpResponse('Welcome to About Page')

def contact(request):
  return HttpResponse('Welcome to Contact Page')