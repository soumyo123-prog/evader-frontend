from firebase_admin import auth
from rest_framework import status
from rest_framework.exceptions import ValidationError


class Firebase:
    @classmethod
    def verifyIdToken(cls, idToken):
        try:
            verified = auth.verify_id_token(idToken)
            return verified
        except:
            raise ValidationError(
                detail="ID Token not valid",
                code=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
