from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json


@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))

            username = data.get("username")
            password = data.get("password")

            if not username or not password:
                return JsonResponse({"error": "Username and password required"}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "User already exists"}, status=400)

            user = User.objects.create_user(
                username=username,
                password=password
            )

            return JsonResponse({
                "message": "User registered successfully",
                "username": user.username
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=400)


@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))

            username = data.get("username")
            password = data.get("password")

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({
                    "message": "Login successful",
                    "username": user.username
                })
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=400)