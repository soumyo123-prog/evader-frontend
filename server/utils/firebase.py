from firebase_admin import auth
from rest_framework import status
from rest_framework.exceptions import ValidationError


class Firebase:
    @classmethod
    def verify_id_token(cls, idToken):
        try:
            verified_token = auth.verify_id_token(idToken)
            return verified_token
        except:
            raise ValidationError(detail='Invalid ID Token!',
                                  code=status.HTTP_422_UNPROCESSABLE_ENTITY)
