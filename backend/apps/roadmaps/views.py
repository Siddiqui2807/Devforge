from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Roadmap, RoadmapStep, UserProgress
from .serializers import RoadmapSerializer


class RoadmapListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        roadmaps = Roadmap.objects.all()
        serializer = RoadmapSerializer(roadmaps, many=True)
        return Response(serializer.data)


class RoadmapDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        roadmap = Roadmap.objects.get(pk=pk)
        serializer = RoadmapSerializer(roadmap)
        return Response(serializer.data)


class ToggleProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        step_id = request.data.get("step_id")
        step = RoadmapStep.objects.get(id=step_id)

        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            step=step
        )

        if not created:
            progress.completed = not progress.completed
            progress.save()

        return Response({"status": "updated"})