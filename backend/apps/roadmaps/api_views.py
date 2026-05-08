from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Roadmap
from .serializers import RoadmapCreateSerializer, RoadmapSerializer


SKILL_ALIASES = {
    "ml": "machine learning",
    "ai": "machine learning",
    "datascience": "data science",
    "data-science": "data science",
    "reactjs": "react",
    "react.js": "react",
    "js": "javascript",
}


ROADMAP_TRACKS = {
    "python": {
        "beginner": [
            "Set up Python environment and package management",
            "Master variables, functions, modules, and file handling",
            "Practice problem solving with loops and data structures",
        ],
        "intermediate": [
            "Learn object-oriented programming and testing with pytest",
            "Build REST APIs with Django or FastAPI",
            "Use SQL databases and ORMs for persistent data",
        ],
        "advanced": [
            "Implement async workflows and background jobs",
            "Add authentication, authorization, and API rate limiting",
            "Deploy with observability, logging, and performance tuning",
        ],
        "projects": [
            "Build a production-style API with monitoring and CI",
            "Create a data pipeline and analytics dashboard",
        ],
    },
    "javascript": {
        "beginner": [
            "Learn language fundamentals, ES6+, and browser APIs",
            "Build responsive interfaces with semantic HTML and CSS",
            "Practice DOM events and state management basics",
        ],
        "intermediate": [
            "Use React for reusable components and routed experiences",
            "Integrate REST APIs with robust error handling",
            "Build Node.js services with Express and validation",
        ],
        "advanced": [
            "Improve app performance with code splitting and caching",
            "Add testing strategy with unit and integration tests",
            "Harden security for auth, input validation, and headers",
        ],
        "projects": [
            "Build a full-stack SaaS dashboard with auth and roles",
            "Create a real-time collaboration tool with WebSockets",
        ],
    },
    "react": {
        "beginner": [
            "Learn component architecture, props, and state",
            "Understand hooks: useState, useEffect, and custom hooks",
            "Build forms with validation and controlled inputs",
        ],
        "intermediate": [
            "Implement routing, protected pages, and lazy loading",
            "Manage async data with service-layer abstractions",
            "Create reusable UI components with consistent tokens",
        ],
        "advanced": [
            "Optimize rendering and avoid unnecessary re-renders",
            "Set up accessibility checks and keyboard navigation",
            "Introduce test coverage for core UI flows",
        ],
        "projects": [
            "Build a polished multi-module admin dashboard",
            "Create a reusable internal design system package",
        ],
    },
    "machine learning": {
        "beginner": [
            "Revise Python, NumPy, Pandas, and data visualization",
            "Learn supervised learning fundamentals and metrics",
            "Practice data cleaning and feature preparation",
        ],
        "intermediate": [
            "Train baseline models with cross-validation",
            "Apply feature engineering and model selection",
            "Track experiments and compare performance",
        ],
        "advanced": [
            "Build deployment-ready inference services",
            "Implement model monitoring and drift checks",
            "Add explainability for predictions and decisions",
        ],
        "projects": [
            "Develop an end-to-end prediction system with API",
            "Create an experiment dashboard for model lifecycle tracking",
        ],
    },
    "data science": {
        "beginner": [
            "Learn statistics, probability, and exploratory analysis",
            "Master Pandas workflows for cleaning and transformation",
            "Create clear visual narratives from datasets",
        ],
        "intermediate": [
            "Build SQL-first analytical pipelines and dashboards",
            "Apply hypothesis testing to product/business questions",
            "Automate recurring reports with reproducible notebooks",
        ],
        "advanced": [
            "Design reliable data quality validation checks",
            "Build forecasting and segmentation use cases",
            "Communicate insight-to-action with stakeholder metrics",
        ],
        "projects": [
            "Create a business KPI intelligence dashboard",
            "Build a customer behavior analysis project with recommendations",
        ],
    },
}


def _normalize_skill(skill):
    cleaned = str(skill or "").strip().lower()
    cleaned = cleaned.replace("_", " ").replace("-", " ")
    cleaned = " ".join(cleaned.split())
    return SKILL_ALIASES.get(cleaned, cleaned)


def _generic_track(display_skill):
    return {
        "beginner": [
            f"Understand the core concepts and terminology of {display_skill}",
            f"Complete foundational tutorials and guided exercises in {display_skill}",
            f"Build small practice tasks to reinforce fundamentals",
        ],
        "intermediate": [
            f"Build feature-complete projects using {display_skill}",
            "Adopt testing, debugging, and version-control best practices",
            "Learn common architecture patterns used in production",
        ],
        "advanced": [
            "Improve performance, security, and maintainability",
            "Design scalable solutions for real-world requirements",
            "Document implementation decisions and tradeoffs",
        ],
        "projects": [
            f"Build one portfolio-grade project focused on {display_skill}",
            "Create a deployment and maintenance plan for your project",
        ],
    }


def _build_section(title, items):
    lines = [title]
    lines.extend([f"- {item}" for item in items])
    return lines


def _build_roadmap_content(skill):
    display_skill = str(skill).strip() or "General Development"
    normalized_skill = _normalize_skill(skill)
    track = ROADMAP_TRACKS.get(normalized_skill, _generic_track(display_skill))

    lines = [f"Skill Focus: {display_skill}", ""]
    lines.extend(_build_section("Beginner Stage", track["beginner"]))
    lines.append("")
    lines.extend(_build_section("Intermediate Stage", track["intermediate"]))
    lines.append("")
    lines.extend(_build_section("Advanced Stage", track["advanced"]))
    lines.append("")
    lines.extend(_build_section("Portfolio Milestones", track["projects"]))

    return "\n".join(lines)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def roadmap_list_create(request):
    if request.method == "GET":
        roadmaps = Roadmap.objects.filter(user=request.user).order_by("-created_at")
        serializer = RoadmapSerializer(roadmaps, many=True)
        return Response(serializer.data)

    create_serializer = RoadmapCreateSerializer(data=request.data)
    create_serializer.is_valid(raise_exception=True)

    skill = create_serializer.validated_data["skill"]
    roadmap = Roadmap.objects.create(
        user=request.user,
        skill=skill,
        content=_build_roadmap_content(skill),
    )

    serializer = RoadmapSerializer(roadmap)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
