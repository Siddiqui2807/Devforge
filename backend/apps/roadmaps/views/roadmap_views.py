from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json
from apps.roadmaps.models import Roadmap

@csrf_exempt
def generate_roadmap(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body.decode('utf-8'))

            skill = body.get("skill", "").lower()
            username = body.get("username")

            if not skill or not username:
                return JsonResponse({"error": "Skill and username required"}, status=400)

            user = User.objects.get(username=username)

            roadmap = [
                f"📌 Introduction to {skill}",
                f"📚 Learn fundamentals of {skill}",
                f"🧠 Understand core concepts of {skill}",
                f"🛠 Practice small projects in {skill}",
                f"⚙️ Learn advanced topics in {skill}",
                f"🚀 Build real-world applications using {skill}",
                f"📂 Create portfolio projects in {skill}",
                f"🎯 Prepare for {skill} interviews"
            ]

            Roadmap.objects.create(
                user=user,
                skill=skill,
                content="\n".join(roadmap)
            )

            return JsonResponse({"roadmap": roadmap})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Only POST allowed"}, status=400)