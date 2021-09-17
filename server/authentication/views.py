from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from .serializers import LoginSerializer

User = get_user_model()

# Create your views here.


def create_auth_token(user):
    token, key = Token.objects.get_or_create(user=user)
    return token


class LoginView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        token = create_auth_token(user)

        return Response(data={'token': token}, status=status.HTTP_200_OK)
