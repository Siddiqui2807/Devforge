from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.architecture.services.diagram_service import DiagramService


class ArchitectureDiagramView(APIView):

    def post(self, request):

        project = request.data

        service = DiagramService()

        try:
            diagram = service.generate_architecture(project)

            return Response(
                {
                    "diagram": diagram
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )