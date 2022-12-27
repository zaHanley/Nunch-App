from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.contrib.auth import get_user_model

# User = get_user_model()

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    instructions = models.TextField(blank=True, null=True, default='')
    ingredients = models.TextField(blank=True, null=True, default='')
    description = models.TextField(blank=True, null=True, default='')
    image_url = models.TextField(blank=True, null=True, default='')
    time = models.CharField(max_length=255)
    quantity = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Cookbook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    recipes = models.ManyToManyField(
        Recipe,
        through='CookbookRecipe',
        through_fields=('cookbook', 'recipe')
    )

    def __str__(self):
        return self.name

class Section(models.Model):
    cookbook = models.ForeignKey(Cookbook, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    recipes = models.ManyToManyField(
        Recipe,
        through='CookbookRecipe',
        through_fields=('section', 'recipe')
    )

    def __str__(self):
        return self.name



class CookbookRecipe(models.Model):
    cookbook = models.ForeignKey(Cookbook, on_delete=models.SET_NULL, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'{self.cookbook} - {self.section} - {self.recipe}'

# This schema allows users to have multiple cookbooks, each of which can have multiple sections and recipes. 
# Recipes can be used in multiple cookbooks and sections, allowing users to easily share their recipes with each other. 
# Additionally, the CookbookRecipe model's section field being required ensures that a recipe can only be added to a cookbook if the cookbook has a section.