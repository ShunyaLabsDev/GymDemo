from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('membership/', views.membership, name='membership'),
    path('trainers/', views.trainers, name='trainers'),
    path('gallery/', views.gallery, name='gallery'),
    path('contact/', views.contact, name='contact'),
    path('api/simulator/', views.submit_simulator, name='submit_simulator'),
]
