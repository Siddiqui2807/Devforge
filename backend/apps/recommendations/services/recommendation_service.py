from __future__ import annotations

from typing import Iterable


SKILL_ALIASES = {
    "ai": "machine learning",
    "ml": "machine learning",
    "datascience": "data science",
    "data-science": "data science",
    "reactjs": "react",
    "react.js": "react",
    "js": "javascript",
    "node": "node.js",
    "nodejs": "node.js",
    "node.js": "node.js",
    "py": "python",
    "golang": "go",
    "k8s": "kubernetes",
    "aws cloud": "aws",
    "gcp cloud": "gcp",
}


RECOMMENDATION_CATALOG = {
    "python": [
        "Build a web scraper with scheduling and export support",
        "Develop a REST API for a task management platform",
        "Create a data processing pipeline with reporting dashboards",
        "Build an automation bot for recurring business workflows",
    ],
    "javascript": [
        "Build an interactive portfolio site with filtering and search",
        "Develop a real-time chat application with rooms",
        "Create a kanban productivity board with drag-and-drop",
        "Build a browser extension for workflow shortcuts",
    ],
    "react": [
        "Build a SaaS analytics dashboard with role-based views",
        "Create a multi-step onboarding flow with form validation",
        "Develop an e-commerce storefront with cart and checkout UI",
        "Build a reusable component library and style guide",
    ],
    "machine learning": [
        "Build a churn prediction model and expose it via API",
        "Create an image classification pipeline with model metrics",
        "Develop a recommendation model with explainability reports",
        "Build an experiment tracker for model versioning",
    ],
    "java": [
        "Develop a Spring Boot inventory management API",
        "Build a secure authentication service with JWT and refresh flow",
        "Create a microservice for order processing with queue support",
        "Implement a Java-based notification service with retry logic",
    ],
    "data science": [
        "Build an end-to-end exploratory analysis notebook project",
        "Create a KPI dashboard from cleaned business datasets",
        "Develop a customer segmentation workflow with clustering",
        "Build a forecasting project with error analysis reporting",
    ],
    "django": [
        "Build a learning management platform with user roles",
        "Develop a blog CMS with moderation and analytics",
        "Create a booking system with calendar availability rules",
        "Build a subscription billing backend with webhook handlers",
    ],
    "node.js": [
        "Build a scalable API gateway with caching and rate limiting",
        "Create a queue-driven email processing service",
        "Develop a webhook relay service with observability logs",
        "Build a background job scheduler with retry policies",
    ],
    "devops": [
        "Create CI/CD pipelines for build, test, and deployment",
        "Build infrastructure provisioning templates for environments",
        "Implement centralized monitoring and alerting dashboards",
        "Develop blue-green deployment automation scripts",
    ],
    "aws": [
        "Build a serverless API with Lambda and API Gateway",
        "Create an event-driven processing workflow using SQS and SNS",
        "Develop a cloud cost monitoring dashboard",
        "Implement static site delivery with CDN and secure origin",
    ],
    "gcp": [
        "Build a data ingestion pipeline with Cloud Functions and Pub/Sub",
        "Create a container deployment workflow on GKE",
        "Develop a cloud logging and alerting baseline for services",
        "Implement a secure object storage workflow with signed URLs",
    ],
    "sql": [
        "Design and optimize a reporting database schema",
        "Build a query performance benchmark and tuning toolkit",
        "Create data quality checks and anomaly reports",
        "Develop a migration framework with rollback scripts",
    ],
    "c++": [
        "Build a high-performance file indexing tool",
        "Develop a memory-efficient cache library",
        "Create a multithreaded task scheduler",
        "Implement a networking client with protocol parsing",
    ],
    "go": [
        "Build a concurrent API service with graceful shutdown",
        "Develop a worker pool for async job processing",
        "Create a CLI deployment utility with config validation",
        "Implement service health checks and readiness probes",
    ],
}


def _normalize_skill(raw_skill: str) -> str:
    normalized = str(raw_skill or "").strip().lower()
    normalized = normalized.replace("_", " ").replace("-", " ")
    normalized = " ".join(normalized.split())

    if not normalized:
        return ""

    return SKILL_ALIASES.get(normalized, normalized)


def _generic_recommendations(skill: str) -> list[str]:
    display_skill = skill.title()
    return [
        f"Build a beginner project focused on {display_skill} fundamentals",
        f"Create an intermediate {display_skill} portfolio application",
        f"Develop an advanced {display_skill} project with real users in mind",
    ]


def _ordered_unique(items: Iterable[str]) -> list[str]:
    unique_items: list[str] = []
    seen: set[str] = set()

    for item in items:
        if item not in seen:
            seen.add(item)
            unique_items.append(item)

    return unique_items


def get_recommendations(skills: list[str]) -> list[str]:
    normalized_skills = [_normalize_skill(skill) for skill in skills]
    normalized_skills = [skill for skill in normalized_skills if skill]

    if not normalized_skills:
        return []

    recommendations: list[str] = []

    for skill in normalized_skills:
        projects = RECOMMENDATION_CATALOG.get(skill, _generic_recommendations(skill))
        recommendations.extend(projects)

    return _ordered_unique(recommendations)
