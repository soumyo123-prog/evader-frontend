from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError, NotFound
from .models import Event, People


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
            raise ValidationError('Required fields are absent!')
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
