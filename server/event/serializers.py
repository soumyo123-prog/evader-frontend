from rest_framework import serializers, status
from .models import Event, People
from django.contrib.auth import get_user_model


class EventSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=255, allow_blank=True)
    venue = serializers.CharField(max_length=255)
    time = serializers.DateTimeField()
    fireId = serializers.CharField(max_length=255)

    def save(self, **kwargs):
        name = self.validated_data.get('name')
        description = self.validated_data.get('description', '')
        venue = self.validated_data.get('venue')
        time = self.validated_data.get('time')
        fireId = self.validated_data.get('fireId')
        user = self.context["request"].user

        event = Event.objects.create(
            name=name, description=description,
            venue=venue, time=time,
            creator=user, fireId=fireId
        )
        event.save()
        return event


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'venue', 'time', 'fireId', ]


class InvitationSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField(max_length=255)

    def validate(self, data):
        User = get_user_model()
        email = data.get('email')
        id = data.get('id')
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                detail='User with this email does not exist',
                code=status.HTTP_404_NOT_FOUND)
        if not Event.objects.filter(id=id).exists():
            raise serializers.ValidationError(
                detail='Event with this id does not exist',
                code=status.HTTP_404_NOT_FOUND)
        if People.objects.filter(user__email=email, event__id=id).exists():
            raise serializers.ValidationError(
                detail='User is already invited to this event',
                code=status.HTTP_409_CONFLICT)

        return data

    def save(self):
        User = get_user_model()
        email = self.validated_data.get('email')
        id = self.validated_data.get('id')
        user = User.objects.filter(email=email)[0]
        event = Event.objects.get(id=id)
        invitation = People.objects.create(user=user, event=event)
        invitation.save()
        return invitation


class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ['id', 'status', ]


class InvitedEventSerializer(serializers.Serializer):
    def fetch(self):
        user = self.context["request"].user
        invitations = People.objects.filter(user=user)

        if (invitations):
            invitedEvents = []
            for invitation in invitations:
                eventObj = invitation.event
                eventDict = EventsSerializer(eventObj).data
                eventDict['status'] = invitation.status
                eventDict['invitedBy'] = eventObj.creator.email
                invitedEvents.append(eventDict)
            return invitedEvents
        return []
