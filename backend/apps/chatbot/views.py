from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .services.chat_service import get_chatbot_reply


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def chatbot_reply(request):
    message = str(request.data.get("message", "")).strip()
    if not message:
        return Response(
            {"error": "Message is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    reply = get_chatbot_reply(message)
    return Response({"reply": reply}, status=status.HTTP_200_OK)

