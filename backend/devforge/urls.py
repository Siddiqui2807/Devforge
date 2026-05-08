from django.contrib import admin
from django.urls import include, path
from accounts.views import DevForgeTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.roadmaps.urls')),
    path('api/github/', include('apps.github_analyzer.urls')),
    path('api/recommend/', include('apps.recommendations.urls')),
    path('api/chatbot/', include('apps.chatbot.urls')),

    # Login API
    path('api/login/', DevForgeTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
