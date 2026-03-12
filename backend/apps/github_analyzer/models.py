from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class GithubProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="github_profile"
    )

    username = models.CharField(max_length=255, unique=True)

    avatar_url = models.URLField(blank=True, null=True)

    profile_url = models.URLField(blank=True, null=True)

    bio = models.TextField(blank=True, null=True)

    public_repos = models.IntegerField(default=0)

    followers = models.IntegerField(default=0)

    following = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class Repository(models.Model):
    github_profile = models.ForeignKey(
        GithubProfile,
        on_delete=models.CASCADE,
        related_name="repositories"
    )

    name = models.CharField(max_length=255)

    description = models.TextField(blank=True, null=True)

    language = models.CharField(max_length=100, blank=True, null=True)

    stars = models.IntegerField(default=0)

    forks = models.IntegerField(default=0)

    repo_url = models.URLField()

    created_at = models.DateTimeField()

    updated_at = models.DateTimeField()

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    category = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class UserSkill(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="skills"
    )

    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )

    level = models.IntegerField(default=1)

    score = models.FloatField(default=0)

    def __str__(self):
        return f"{self.user} - {self.skill}"