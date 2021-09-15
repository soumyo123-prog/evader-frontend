from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField()
    uid = models.CharField(unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    photoUrl = models.URLField(default='')

    USERNAME_FIELD = 'uid'
    REQUIRED_FIELDS = ['username', 'name', 'email']

    def __str__(self):
      return f'{self.uid} + {self.name}'
