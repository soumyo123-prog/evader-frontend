from django.urls import path
from .views import EventView

urlpatterns = [
    path('create/', EventView.as_view()),
]
