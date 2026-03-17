from django.urls import path
from .views import ArchitectureDiagramView

urlpatterns = [
    path("diagram/", ArchitectureDiagramView.as_view(), name="architecture-diagram"),
]