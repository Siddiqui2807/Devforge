from rest_framework import serializers
from .models import Roadmap, RoadmapStep


class RoadmapStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapStep
        fields = ["id", "title", "order"]


class RoadmapSerializer(serializers.ModelSerializer):
    steps = RoadmapStepSerializer(many=True)

    class Meta:
        model = Roadmap
        fields = ["id", "title", "description", "steps"]