from django.http import JsonResponse
from apps.roadmaps.models import Roadmap

def get_roadmaps(request):
    username = request.GET.get("username")

    if not username:
        return JsonResponse({"error": "Username required"}, status=400)

    data = list(
        Roadmap.objects.filter(user__username=username).values()
    )

    return JsonResponse({"roadmaps": data})