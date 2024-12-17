from rest_framework import serializers
from .models import Book, ReadingEntry

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author']

class ReadingEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingEntry
        fields = ['id', 'book', 'pages_read', 'date']