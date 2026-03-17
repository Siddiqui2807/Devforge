from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from apps.github_analyzer.services.github_service import GithubService


class GithubAnalyzeView(APIView):

    parser_classes = [JSONParser]

    def post(self, request):

        github_username = request.data.get("github_username")

        if not github_username:
            return Response(
                {"error": "github_username is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        service = GithubService()

        try:
            result = service.sync_github_profile(
                user=request.user,
                github_username=github_username
            )

            return Response(
                result,
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )