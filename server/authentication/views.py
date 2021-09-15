from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics

# Create your views here.


class CreateView(generics.GenericAPIView):
    queryset = User.objects.all()

    pass
