from django.db import models
from django.core.exceptions import ValidationError

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    class Meta:
        unique_together = ['title', 'author']

    def __str__(self):
        return self.title

class ReadingEntry(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    pages_read = models.IntegerField()
    date = models.DateField()

    def clean(self):
        if self.pages_read < 0:
            raise ValidationError('Pages read must be a positive number.')
    
    def __str__(self):
        return f"{self.book.title} - {self.pages_read} pages on {self.date}"
    