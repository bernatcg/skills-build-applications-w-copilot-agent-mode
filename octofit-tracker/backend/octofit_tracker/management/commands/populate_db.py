from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker import models as octo_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        self.stdout.write(self.style.WARNING('Deleting existing data...'))
        octo_models.Team.objects.all().delete()
        octo_models.Activity.objects.all().delete()
        octo_models.Leaderboard.objects.all().delete()
        octo_models.Workout.objects.all().delete()
        get_user_model().objects.all().delete()

        # Create teams
        marvel = octo_models.Team.objects.create(name='Marvel')
        dc = octo_models.Team.objects.create(name='DC')

        # Create users
        User = get_user_model()
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='captainamerica', email='cap@marvel.com', password='password', team=marvel),
            User.objects.create_user(username='batman', email='batman@dc.com', password='password', team=dc),
            User.objects.create_user(username='superman', email='superman@dc.com', password='password', team=dc),
        ]

        # Create activities
        activities = [
            octo_models.Activity.objects.create(user=users[0], type='run', duration=30, distance=5),
            octo_models.Activity.objects.create(user=users[1], type='cycle', duration=60, distance=20),
            octo_models.Activity.objects.create(user=users[2], type='swim', duration=45, distance=2),
            octo_models.Activity.objects.create(user=users[3], type='run', duration=50, distance=10),
        ]

        # Create workouts
        workouts = [
            octo_models.Workout.objects.create(name='Hero HIIT', description='High intensity for heroes'),
            octo_models.Workout.objects.create(name='Power Endurance', description='Endurance for super strength'),
        ]

        # Create leaderboard
        octo_models.Leaderboard.objects.create(team=marvel, points=100)
        octo_models.Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
