from django.urls import path
from .views import github_analyzer

urlpatterns = [
    path('analyze/', github_analyzer),
]