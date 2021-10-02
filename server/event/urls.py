from django.urls import path
from .views import (
    CreateEventView,
    FetchEventsView,
    FetchEventView,
    InvitePeopleView,
    FetchInvitedEventsView
)

urlpatterns = [
    path('create/', CreateEventView.as_view()),
    path('fetch/', FetchEventsView.as_view()),
    path('fetch/invited', FetchInvitedEventsView.as_view()),
    path('fetch/<int:pk>/', FetchEventView.as_view()),
    path('invite/<int:pk>/', InvitePeopleView.as_view()),
]
