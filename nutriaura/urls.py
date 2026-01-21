"""
URL configuration for nutriaura app.

Maps URLs to views in the nutriaura application.
"""
from django.shortcuts import render
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    #path("about-us/", views.about_us, name="about_us"),
]
