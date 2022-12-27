from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('sign_in/', views.sign_in),
    path('sign_up/', views.sign_up),
    path('sign_out/', views.sign_out),
    path('curr_user', views.curr_user, name='curr_user'),
    path('api/browse/', views.browse),
    path('api/cookbooks/', views.user_storage),
    path('api/cookbooks/user/<int:user_id>', views.cookbooks_by_user),
    path('api/cookbooks/<int:cookbook_id>', views.cookbook_by_id),
    path('api/cookbooks/<int:cookbook_id>/sections', views.sections_by_cookbook),
    path('api/cookbooks/<int:cookbook_id>/sections/<int:section_id>', views.section_by_id),
    path('api/sections', views.sections),
    path('api/sections/<int:section_id>/recipes', views.recipes_by_section),
    path('api/recipes', views.recipes),
    path('api/recipe', views.recipe),
    path('api/cookbooks/<int:cookbook_id>/sections/<int:section_id>/recipes/<int:recipe_id>', views.recipe_by_id),
    path('api/popular', views.get_popular),
    path('api/import-recipe', views.import_recipe),
    re_path('.*', views.send_the_homepage),
]
