from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, ReadingEntryViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'reading-entries', ReadingEntryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
