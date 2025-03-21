from rest_framework import serializers
from .models import Book, ReadingEntry

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author']

class ReadingEntrySerializer(serializers.ModelSerializer):
    # Nest the BookSerializer to return detailed information about the book
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = ReadingEntry
        fields = ['book', 'pages_read', 'date']