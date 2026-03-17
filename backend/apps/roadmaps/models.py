from django.db import models
from django.conf import settings


class Roadmap(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class RoadmapStep(models.Model):
    roadmap = models.ForeignKey(
        Roadmap,
        on_delete=models.CASCADE,
        related_name="steps"
    )
    title = models.CharField(max_length=200)
    order = models.IntegerField()

    def __str__(self):
        return self.title


class UserProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    step = models.ForeignKey(RoadmapStep, on_delete=models.CASCADE)
    completed = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user} - {self.step.title}"