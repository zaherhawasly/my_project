from django.contrib import admin
from django.urls import path
from . import views

urlpatterns =[
    path('', views.show_map_form),
    path('test_graph/', views.show_best_way),
]