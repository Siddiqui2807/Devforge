from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services.recommendation_service import get_recommendations


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def recommend_projects(request):
    skills = request.data.get("skills", [])

    if isinstance(skills, str):
        skills = [item.strip() for item in skills.split(",") if item.strip()]

    if not isinstance(skills, list):
        return Response({"error": "Skills must be a list."}, status=status.HTTP_400_BAD_REQUEST)

    normalized_skills = [str(skill).strip() for skill in skills if str(skill).strip()]

    if not normalized_skills:
        return Response({"error": "Skills required"}, status=status.HTTP_400_BAD_REQUEST)

    projects = get_recommendations(normalized_skills)

    return Response(
        {
            "skills": normalized_skills,
            "projects": projects,
        },
        status=status.HTTP_200_OK,
    )
