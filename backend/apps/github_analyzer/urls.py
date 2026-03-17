from django.urls import path
from .views import GithubAnalyzeView

urlpatterns = [
    path("analyze/", GithubAnalyzeView.as_view(), name="github-analyze"),
]