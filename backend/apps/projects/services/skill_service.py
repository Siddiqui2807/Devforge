from collections import Counter
from django.contrib.auth import get_user_model

from apps.github_analyzer.models import Repository, Skill, UserSkill
from apps.projects.models import Project

User = get_user_model()


class SkillService:

    def analyze_user_skills(self, user):

        repos = Repository.objects.filter(
            github_profile__user=user
        )

        languages = []

        for repo in repos:
            if repo.language:
                languages.append(repo.language)

        language_counts = Counter(languages)

        skills_created = []

        for language, count in language_counts.items():

            skill, _ = Skill.objects.get_or_create(
                name=language
            )

            user_skill, _ = UserSkill.objects.update_or_create(
                user=user,
                skill=skill,
                defaults={
                    "level": min(count, 10),
                    "score": count
                }
            )

            skills_created.append({
                "skill": language,
                "score": count
            })

        return skills_created


    def recommend_projects(self, user):

        user_skills = UserSkill.objects.filter(user=user)

        recommended_projects = []

        for user_skill in user_skills:

            skill_name = user_skill.skill.name.lower()

            if "python" in skill_name:
                recommended_projects.append({
                    "title": "AI Resume Analyzer",
                    "difficulty": "intermediate",
                    "technologies": ["Python", "NLP", "Machine Learning"],
                    "description": "Analyze resumes using AI and rank candidates."
                })

            if "javascript" in skill_name:
                recommended_projects.append({
                    "title": "Real-time Chat Application",
                    "difficulty": "intermediate",
                    "technologies": ["JavaScript", "WebSockets", "React"],
                    "description": "Build a real-time messaging platform."
                })

            if "react" in skill_name:
                recommended_projects.append({
                    "title": "Developer Portfolio Builder",
                    "difficulty": "beginner",
                    "technologies": ["React", "TailwindCSS"],
                    "description": "Create an interactive portfolio generator."
                })

            if "django" in skill_name:
                recommended_projects.append({
                    "title": "SaaS Blog Platform",
                    "difficulty": "advanced",
                    "technologies": ["Django", "PostgreSQL"],
                    "description": "Multi-user blogging platform with subscriptions."
                })
            if "c" in skill_name and "++" not in skill_name:
                recommended_projects.append({
                    "title": "Mini Operating System Kernel",
                    "difficulty": "advanced",
                    "technologies": ["C", "Operating Systems"],
                    "description": "Build a simple operating system kernel to understand memory and process management."
                })

            if "c++" in skill_name:
                recommended_projects.append({
                    "title": "Game Engine Core",
                    "difficulty": "advanced",
                    "technologies": ["C++", "OpenGL"],
                    "description": "Create the core architecture of a simple game engine."
                })
        return recommended_projects