from django.contrib import admin
from .models import GithubProfile, Repository, Skill, UserSkill


@admin.register(GithubProfile)
class GithubProfileAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "user",
        "public_repos",
        "followers",
        "following",
        "created_at",
    )

    search_fields = (
        "username",
        "user__username",
    )

    list_filter = (
        "created_at",
    )


@admin.register(Repository)
class RepositoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "github_profile",
        "language",
        "stars",
        "forks",
        "created_at",
    )

    search_fields = (
        "name",
        "language",
    )

    list_filter = (
        "language",
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
    )

    search_fields = (
        "name",
    )


@admin.register(UserSkill)
class UserSkillAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "skill",
        "level",
        "score",
    )

    search_fields = (
        "user__username",
        "skill__name",
    )