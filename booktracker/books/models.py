from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class ReadingEntry(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    pages_read = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return f"{self.book.title} - {self.pages_read} pages on {self.date}"
    