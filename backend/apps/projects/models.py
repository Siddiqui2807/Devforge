from django.db import models


class Project(models.Model):

    title = models.CharField(max_length=255)

    description = models.TextField()

    difficulty = models.CharField(
        max_length=50,
        choices=[
            ("beginner", "Beginner"),
            ("intermediate", "Intermediate"),
            ("advanced", "Advanced"),
        ]
    )

    technologies = models.JSONField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title