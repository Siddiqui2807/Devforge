from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import requests

@csrf_exempt
def analyze_github(request):
    if request.method == "POST":
        try:
            if not request.body:
                return JsonResponse({"error": "Empty request body"}, status=400)

            body = json.loads(request.body)
            username = body.get("username")

            if not username:
                return JsonResponse({"error": "Username required"}, status=400)

            url = f"https://api.github.com/users/{username}"
            response = requests.get(url)

            if response.status_code != 200:
                return JsonResponse({"error": "User not found"}, status=404)

            data = response.json()

            return JsonResponse({
                "username": data.get("login"),
                "name": data.get("name"),
                "repos": data.get("public_repos"),
                "followers": data.get("followers"),
                "following": data.get("following"),
                "profile": data.get("html_url"),
                "avatar": data.get("avatar_url"),
            })

        except Exception as e:
            print("🔥 ERROR:", e)
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=400)