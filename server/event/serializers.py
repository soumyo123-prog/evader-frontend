from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError, NotFound
from .models import Event, People


class EventSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=255)
    venue = serializers.CharField(max_length=255)
    time = serializers.DateTimeField()
    photoUrl = serializers.URLField(max_length=300)

    def validate(self, data):
        name = data.get('name', None)
        venue = data.get('venue', None)
        time = data.get('time', None)

        if not name:
            raise ValidationError(
                detail='Name not provided!', code=status.HTTP_400_BAD_REQUEST)

        if not venue:
            raise ValidationError(
                detail='Venue not provided!', code=status.HTTP_400_BAD_REQUEST)

        if not time:
            raise ValidationError(
                detail='Time not provided!', code=status.HTTP_400_BAD_REQUEST)

        return data

    def save(self):
        name = self.validated_data.get('name')
        description = self.validated_data.get('description', '')
        venue = self.validated_data.get('venue')
        time = self.validated_data.get('time')
        photoUrl = self.validated_data.get('photoUrl', '')
        user = self.context.get('request.user')

        event = Event.objects.create(
            name=name,
            description=description,
            venue=venue,
            time=time,
            photoUrl=photoUrl,
            creator=user)

        event.save()
        eventDict = {'id': event.id}
        return eventDict
