from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework import permissions
from django.contrib.auth import get_user_model
from .models import Event, Services, Products, People
from .serializers import EventSerializer

from datetime import datetime, timedelta

# Create your views here.


class EventView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        time = datetime.strptime(request.data.get(
            'time'), '%Y-%m-%dT%H:%M:%S.%fZ')
        time += timedelta(hours=5, minutes=30)
        request.data['time'] = time
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(data={'id': event.id}, status=status.HTTP_200_OK)

        print(serializer.errors)
        return Response(data={})
