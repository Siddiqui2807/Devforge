from rest_framework import serializers
from .models import Roadmap


def _split_non_empty_lines(content):
    return [line.strip() for line in str(content or "").splitlines() if line.strip()]


def _parse_roadmap_sections(content):
    lines = _split_non_empty_lines(content)

    sections = []
    current_title = None
    current_items = []

    for line in lines:
        if line.startswith("Skill Focus:"):
            continue

        is_section_header = line.endswith("Stage") or line == "Portfolio Milestones"
        if is_section_header:
            if current_title and current_items:
                sections.append({"title": current_title, "items": current_items})
            current_title = line
            current_items = []
            continue

        if line.startswith("- "):
            current_items.append(line[2:].strip())
        elif current_title:
            current_items.append(line)

    if current_title and current_items:
        sections.append({"title": current_title, "items": current_items})

    if sections:
        return sections

    fallback_items = [line for line in lines if not line.startswith("Skill Focus:")]
    return [{"title": "Roadmap Steps", "items": fallback_items}] if fallback_items else []


class RoadmapSerializer(serializers.ModelSerializer):
    roadmap = serializers.SerializerMethodField()
    roadmap_sections = serializers.SerializerMethodField()

    class Meta:
        model = Roadmap
        fields = ["id", "skill", "content", "roadmap", "roadmap_sections", "created_at"]
        read_only_fields = ["id", "content", "roadmap", "roadmap_sections", "created_at"]

    def get_roadmap_sections(self, obj):
        return _parse_roadmap_sections(obj.content)

    def get_roadmap(self, obj):
        sections = _parse_roadmap_sections(obj.content)
        if sections:
            return [item for section in sections for item in section.get("items", [])]

        return _split_non_empty_lines(obj.content)


class RoadmapCreateSerializer(serializers.Serializer):
    # Support both `skill` and legacy `title` payloads.
    skill = serializers.CharField(required=False, allow_blank=True, max_length=255)
    title = serializers.CharField(required=False, allow_blank=True, max_length=255)

    def validate(self, attrs):
        raw_skill = attrs.get("skill") or attrs.get("title") or ""
        cleaned_skill = raw_skill.strip()

        if not cleaned_skill:
            raise serializers.ValidationError({"skill": "Skill is required."})

        attrs["skill"] = cleaned_skill
        return attrs
