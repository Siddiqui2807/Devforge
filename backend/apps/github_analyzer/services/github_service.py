from __future__ import annotations

import requests

GITHUB_API_BASE = "https://api.github.com"
DEFAULT_TIMEOUT_SECONDS = 12


def _safe_int(value):
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def _to_list_of_dicts(value):
    return value if isinstance(value, list) else []


def _get_json(url):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "DevForge-GitHub-Analyzer",
    }

    try:
        response = requests.get(url, headers=headers, timeout=DEFAULT_TIMEOUT_SECONDS)
    except requests.RequestException:
        return None, "Unable to reach GitHub API. Please try again later."

    if response.status_code == 404:
        return None, "GitHub user not found."

    if response.status_code >= 400:
        return None, "GitHub API error. Please try again later."

    try:
        return response.json(), None
    except ValueError:
        return None, "Invalid response received from GitHub API."


def analyze_github_user(username):
    cleaned_username = str(username or "").strip()
    if not cleaned_username:
        return {"error": "Username is required."}

    user_data, user_error = _get_json(f"{GITHUB_API_BASE}/users/{cleaned_username}")
    if user_error:
        return {"error": user_error}

    repos_data, repos_error = _get_json(
        f"{GITHUB_API_BASE}/users/{cleaned_username}/repos?per_page=100&sort=updated"
    )
    if repos_error:
        return {"error": repos_error}

    repos = _to_list_of_dicts(repos_data)
    repo_count = _safe_int(user_data.get("public_repos")) or len(repos)

    language_count = {}
    total_stars = 0
    total_forks = 0
    top_repositories = []

    for repo in repos:
        if not isinstance(repo, dict):
            continue

        language = repo.get("language")
        if language:
            language_count[language] = language_count.get(language, 0) + 1

        stars = _safe_int(repo.get("stargazers_count"))
        forks = _safe_int(repo.get("forks_count"))
        total_stars += stars
        total_forks += forks

        top_repositories.append(
            {
                "name": repo.get("name") or "",
                "language": language or "N/A",
                "stars": stars,
                "forks": forks,
                "url": repo.get("html_url") or "",
                "updated_at": repo.get("updated_at") or "",
                "description": repo.get("description") or "",
            }
        )

    sorted_languages = sorted(language_count.items(), key=lambda pair: pair[1], reverse=True)
    skills = [language for language, _ in sorted_languages]
    languages = skills[:8]

    top_repositories = sorted(
        top_repositories,
        key=lambda repo: (repo["stars"], repo["forks"]),
        reverse=True,
    )[:5]

    return {
        "username": user_data.get("login") or cleaned_username,
        "name": user_data.get("name") or "",
        "bio": user_data.get("bio") or "",
        "profile_url": user_data.get("html_url") or f"https://github.com/{cleaned_username}",
        "avatar_url": user_data.get("avatar_url") or "",
        "followers": _safe_int(user_data.get("followers")),
        "following": _safe_int(user_data.get("following")),
        "repo_count": repo_count,
        "skills": skills,
        "languages": languages,
        "total_stars": total_stars,
        "total_forks": total_forks,
        "top_repositories": top_repositories,
    }
