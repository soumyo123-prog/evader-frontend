import os
import firebase_admin
from firebase_admin import auth, credentials
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_400_BAD_REQUEST
from rest_framework.exceptions import ValidationError
from dotenv import load_dotenv

load_dotenv()

serviceAccountKey = {
    "type": os.environ.get('type'),
    "project_id": os.environ.get('project_id'),
    "private_key_id": os.environ.get('private_key_id'),
    "private_key": os.environ.get('private_key').replace('\\n', '\n'),
    "client_email": os.environ.get('client_email'),
    "client_id": os.environ.get('client_id'),
    "auth_uri": os.environ.get('auth_uri'),
    "token_uri": os.environ.get('token_uri'),
    "auth_provider_x509_cert_url": os.environ.get('auth_provider_x509_cert_url'),
    "client_x509_cert_url": os.environ.get('client_x509_cert_url'),
}

cred = credentials.Certificate(serviceAccountKey)
firebase_admin.initialize_app(cred)


class FirebaseAPI:
    @classmethod
    def verify_id_token(cls, id_token):
        try:
            decoded_token = auth.verify_id_token(id_token)
            return decoded_token
        except:
            raise ValidationError(
                'Invalid Firebase ID Token.', HTTP_422_UNPROCESSABLE_ENTITY)

    @classmethod
    def get_email(cls, jwt):
        email = jwt.get('email', '')
        return email

    @classmethod
    def get_name(cls, jwt):
        name = jwt.get('name', '')
        return name

    @classmethod
    def delete_user_by_uid(cls, uid):
        auth.delete_user(uid)
