# Generated by Django 3.1.4 on 2023-01-31 15:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_review_createdat'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='createdAt',
            new_name='createdt',
        ),
    ]
