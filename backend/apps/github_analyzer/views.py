from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .services.github_service import analyze_github_user


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def github_analyzer(request):
    username = (request.GET.get("username") or "").strip()

    if not username:
        return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)

    result = analyze_github_user(username)
    if isinstance(result, dict) and result.get("error"):
        return Response(result, status=status.HTTP_404_NOT_FOUND)

    return Response(result, status=status.HTTP_200_OK)
