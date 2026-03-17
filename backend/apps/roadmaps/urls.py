from django.urls import path
from .views import RoadmapListView, RoadmapDetailView

urlpatterns = [
    path("roadmaps/", RoadmapListView.as_view()),
    path("roadmaps/<int:pk>/", RoadmapDetailView.as_view()),
]