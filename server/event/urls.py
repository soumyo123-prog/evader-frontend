from django.urls import path
from .views import CreateEventView, FetchEventView

urlpatterns = [
    path('create/', CreateEventView.as_view()),
    path('fetch/', FetchEventView.as_view()),
]
