from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.roadmaps.services.github_service import GitHubService


class GitHubAnalyzeView(APIView):

    def get(self, request):
        username = request.query_params.get("username")

        if not username:
            return Response(
                {"error": "Username is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        data = GitHubService.analyze_github(username)

        if "error" in data:
            return Response(data, status=status.HTTP_404_NOT_FOUND)

        return Response(data, status=status.HTTP_200_OK)