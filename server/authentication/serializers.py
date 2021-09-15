from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .firebase import Firebase


class LoginSerializer(serializers.Serializer):
    
