from django.urls import path
from .api_views import roadmap_list_create

urlpatterns = [
    path("roadmap/", roadmap_list_create),
    path("roadmap/generate/", roadmap_list_create),
    path("roadmaps/", roadmap_list_create),
]
