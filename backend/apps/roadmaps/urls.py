from django.urls import path
from apps.roadmaps.views.github_view import GitHubAnalyzeView

urlpatterns = [
    path('github/analyze/', GitHubAnalyzeView.as_view(), name='github-analyze'),
]