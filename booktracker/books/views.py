from rest_framework import viewsets
from rest_framework import filters
from .models import Book, ReadingEntry
from .serializers import BookSerializer, ReadingEntrySerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # Optional: You can add search and filter functionality
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author']

class ReadingEntryViewSet(viewsets.ModelViewSet):
    queryset = ReadingEntry.objects.all()
    serializer_class = ReadingEntrySerializer

    # Optional: Add filters and ordering for reading entries
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['date', 'pages_read']  # Can order by date or pages read
    ordering = ['date']  # Default ordering by date

    # Optional: You could filter by book (if needed)
    def get_queryset(self):
        queryset = super().get_queryset()
        book_id = self.request.query_params.get('book', None)
        if book_id is not None:
            queryset = queryset.filter(book_id=book_id)
        return queryset