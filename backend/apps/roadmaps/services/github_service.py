import requests
from apps.roadmaps.services.ai_service import AIService
from apps.roadmaps.services.roadmap_service import RoadmapService
from apps.roadmaps.services.resume_service import ResumeService


class GitHubService:

    BASE_URL = "https://api.github.com"

    @staticmethod
    def get_user_data(username):
        url = f"{GitHubService.BASE_URL}/users/{username}"
        response = requests.get(url)

        if response.status_code != 200:
            return None

        return response.json()

    @staticmethod
    def get_user_repos(username):
        url = f"{GitHubService.BASE_URL}/users/{username}/repos"
        response = requests.get(url)

        if response.status_code != 200:
            return []

        return response.json()

    @staticmethod
    def analyze_github(username):
        user = GitHubService.get_user_data(username)
        repos = GitHubService.get_user_repos(username)

        if not user:
            return {"error": "User not found"}

        total_stars = 0
        languages = {}
        repo_list = []

        for repo in repos:
            total_stars += repo.get("stargazers_count", 0)

            lang = repo.get("language")
            if lang:
                languages[lang] = languages.get(lang, 0) + 1

            repo_list.append({
                "name": repo.get("name"),
                "stars": repo.get("stargazers_count"),
                "url": repo.get("html_url")
            })

        result = {
            "username": username,
            "public_repos": user.get("public_repos"),
            "followers": user.get("followers"),
            "following": user.get("following"),
            "total_stars": total_stars,
            "top_languages": languages,
            "repos": repo_list[:10]
        }

        result["insights"] = AIService.generate_insights(result)
        result["roadmap"] = RoadmapService.generate_roadmap(result)
        result["resume"] = ResumeService.generate_resume(result)

        return result