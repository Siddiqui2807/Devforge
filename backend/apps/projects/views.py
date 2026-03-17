from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.projects.services.skill_service import SkillService


class ProjectRecommendationView(APIView):

    def get(self, request):

        user = request.user

        service = SkillService()

        try:
            projects = service.recommend_projects(user)

            return Response(
                {
                    "recommended_projects": projects
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )