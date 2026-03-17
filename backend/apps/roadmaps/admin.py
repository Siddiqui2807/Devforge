from django.contrib import admin
from .models import Roadmap, RoadmapStep, UserProgress

admin.site.register(Roadmap)
admin.site.register(RoadmapStep)
admin.site.register(UserProgress)