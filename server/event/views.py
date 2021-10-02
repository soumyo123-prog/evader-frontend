from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework import permissions
from django.contrib.auth import get_user_model
from .models import Event, Services, Products, People
from .serializers import (
    EventSerializer,
    EventsSerializer,
    InvitationSerializer,
    PeopleSerializer,
    InvitedEventSerializer
)

from datetime import datetime

# Create your views here.


class CreateEventView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        time = datetime.strptime(request.data.get(
            'time'), '%Y-%m-%dT%H:%M:%S.%fZ')
        request.data['time'] = time
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            eventDict = EventsSerializer(event)
            return Response(data=eventDict.data, status=status.HTTP_201_CREATED)
        return Response(data={}, status=status.HTTP_400_BAD_REQUEST)


class FetchEventsView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventsSerializer
    queryset = Event.objects.all()

    def get(self, request, *args, **kwargs):
        events = Event.objects.filter(creator=request.user)
        if events:
            serializer = self.get_serializer(events, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=[], status=status.HTTP_200_OK)


class FetchEventView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventsSerializer
    lookup_field = 'pk'
    queryset = Event.objects.all()


class InvitePeopleView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = People.objects.all()
    serializer_class = InvitationSerializer

    def post(self, request, *args, **kwargs):
        request.data['id'] = kwargs.get('pk')
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            error = serializer.errors.get('non_field_errors')[0]
            return Response(data={'error': error}, status=status.HTTP_404_NOT_FOUND)
        invitation = serializer.save()
        invitationDict = PeopleSerializer(invitation)
        return Response(data=invitationDict.data, status=status.HTTP_200_OK)


class FetchInvitedEventsView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = InvitedEventSerializer

    def get(self, request, *args, **kwargs):
        serializer = self.get_serializer()
        invitations = serializer.fetch()
        return Response(data=invitations, status=status.HTTP_200_OK)
