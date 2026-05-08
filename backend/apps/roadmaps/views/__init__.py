from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.roadmaps.models import Roadmap


@api_view(['GET', 'POST'])
def roadmap_list_create(request):
    if request.method == 'GET':
        roadmaps = Roadmap.objects.all().values()
        return Response(list(roadmaps))

    elif request.method == 'POST':
        skill = request.data.get('skill')

        if not skill:
            return Response({"error": "Skill required"}, status=400)

        # SIMPLE GENERATED CONTENT
        content = f"""
📌 Introduction to {skill}
📚 Learn basics of {skill}
🛠 Build small projects in {skill}
🚀 Build advanced applications
💼 Prepare for interviews
"""

        roadmap = Roadmap.objects.create(
            skill=skill,
            content=content
        )

        return Response({
            "id": roadmap.id,
            "skill": roadmap.skill,
            "content": roadmap.content
        })