from django.urls import path
from .views import CreateEventView, FetchEventsView, FetchEventView

urlpatterns = [
    path('create/', CreateEventView.as_view()),
    path('fetch/', FetchEventsView.as_view()),
    path('fetch/<int:pk>/', FetchEventView.as_view()),
]
