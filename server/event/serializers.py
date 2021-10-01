from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from .models import Event, People
from django.contrib.auth import get_user_model


class EventSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=255, allow_blank=True)
    venue = serializers.CharField(max_length=255)
    time = serializers.DateTimeField()
    fireId = serializers.CharField(max_length=255)

    def validate(self, data):
        name = data.get('name')
        time = data.get('time')
        venue = data.get('venue')
        if not name or not venue or not time:
            raise ValidationError(
                'Required fields are absent!', status.HTTP_400_BAD_REQUEST)
        return data

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
    email = serializers.EmailField(max_length=255)

    def validate(self, data):
        User = get_user_model()
        email = data.get('email')
        if not email:
            raise ValidationError('Email field is required!',
                                  status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(email=email).exists():
            raise ValidationError(
                'User with this email does not exist', status.HTTP_404_NOT_FOUND)
        return data

    def save(self, id):
        User = get_user_model()
        email = self.validated_data.get('email')
        user = User.objects.filter(email=email)[0]
        event = Event.objects.get(id=id)
        invitation = People.objects.create(user=user, event=event)
        invitation.save()
        return invitation


class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = ['id', 'status', ]
