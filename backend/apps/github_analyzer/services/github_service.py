import requests
from django.contrib.auth import get_user_model

from apps.github_analyzer.models import GithubProfile, Repository
from apps.projects.services.skill_service import SkillService

User = get_user_model()


class GithubService:

    BASE_URL = "https://api.github.com"

    def fetch_github_profile(self, username):
        url = f"{self.BASE_URL}/users/{username}"
        response = requests.get(url)

        if response.status_code != 200:
            raise Exception("GitHub user not found")

        return response.json()

    def fetch_repositories(self, username):
        url = f"{self.BASE_URL}/users/{username}/repos"
        response = requests.get(url)

        if response.status_code != 200:
            raise Exception("Failed to fetch repositories")

        return response.json()

    def sync_github_profile(self, user, github_username):

        profile_data = self.fetch_github_profile(github_username)

        profile, _ = GithubProfile.objects.update_or_create(
            user=user,
            defaults={
                "username": profile_data["login"],
                "avatar_url": profile_data["avatar_url"],
                "profile_url": profile_data["html_url"],
                "bio": profile_data["bio"],
                "public_repos": profile_data["public_repos"],
                "followers": profile_data["followers"],
                "following": profile_data["following"],
            }
        )

        repos = self.fetch_repositories(github_username)

        for repo in repos:
            Repository.objects.update_or_create(
                github_profile=profile,
                name=repo["name"],
                defaults={
                    "description": repo["description"],
                    "language": repo["language"],
                    "stars": repo["stargazers_count"],
                    "forks": repo["forks_count"],
                    "repo_url": repo["html_url"],
                    "created_at": repo["created_at"],
                    "updated_at": repo["updated_at"],
                }
            )

        # Run skill analysis
        skill_service = SkillService()
        skills = skill_service.analyze_user_skills(user)

        return {
            "profile": profile.username,
            "skills": skills
        }