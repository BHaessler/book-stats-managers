from rest_framework import viewsets
from .models import Book, ReadingEntry
from .serializers import BookSerializer, ReadingEntrySerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ReadingEntryViewSet(viewsets.ModelViewSet):
    queryset = ReadingEntry.objects.all()
    serializer_class = ReadingEntrySerializer