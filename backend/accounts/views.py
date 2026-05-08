from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username & Password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    User.objects.create_user(username=username, password=password)

    return Response({"message": "User created successfully"})


class DevForgeTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Backward-compatible alias for older frontend code expecting `token`.
        data["token"] = data.get("access")
        data["username"] = self.user.username
        return data


class DevForgeTokenObtainPairView(TokenObtainPairView):
    serializer_class = DevForgeTokenObtainPairSerializer
