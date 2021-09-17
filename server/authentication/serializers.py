from rest_framework import serializers
from django.contrib.auth import get_user_model
from utils.firebase import Firebase

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    id_token = serializers.CharField()

    def validate(self, data):
        id_token = data.get('id_token', None)
        verified_token = Firebase.verify_id_token(id_token)
        uid = verified_token.get('uid')
        user = User.objects.get(uid=uid)

        if not user:
            email = verified_token.get('email', '')
            name = verified_token.get('name', '')
            user = User.objects.create(
                uid=uid, username=uid, email=email, name=name)

        data['user'] = user
        return data
