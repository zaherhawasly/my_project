from multiprocessing import context
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def show_map_form(request):
    return render(request,'base/input_data.html')