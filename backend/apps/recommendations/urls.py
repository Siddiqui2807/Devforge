from django.urls import path
from .views import recommend_projects

urlpatterns = [
    path('', recommend_projects),
]