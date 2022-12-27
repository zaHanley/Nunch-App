from django.shortcuts import render
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.contrib.auth import authenticate, login, logout 
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from django.conf import settings
import requests
from .models import *
import json

api_key = settings.API_KEY
import_api_key = settings.IMPORT_API_KEY


@api_view(["POST"])
def sign_in(request):
    email = request.data["email"]
    password = request.data["password"]
    user = authenticate(username=email, password=password)
    # print(request.data)
    if user is not None and user.is_active:
        try:
            login(request, user)
            print(f"{email} is signed in!")
            return JsonResponse({"signIn": True})
        except Exception as e:
            print(e)
            return JsonResponse({"signIn": False})
    else:
        return JsonResponse({"signNNNIn": False})


@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:
        print(request.user.id)
        datatest = request.user.id
        # data = serializers.serialize(
        #     "json",
        #     [request.user],
        #     # fields=["first_name", "last_name", "email", 'id'],
        # )
        # return HttpResponse(data)
        return JsonResponse({'success': True, 'id': datatest})
    else:
        return JsonResponse({'success': False, "message": "User not authenticated"})


@api_view(["POST"])
def sign_up(request):
    email = request.data["email"]
    password = request.data["password"]
    first_name = request.data["first_name"]
    last_name = request.data["last_name"]
    new_user = User.objects.create_user(
        username=email,
        email=email,
        first_name=first_name,
        last_name=last_name,
        password=password,
    )
    new_user.save()
    print('signup successful')
    return JsonResponse({"message": "User created", 'success':True})


def sign_out(request):
    print(request)
    try:
        logout(request)
        print(f"user signed out")
        return JsonResponse({"signout": True})
    except Exception as e:
        print(e)
        return JsonResponse({"signout": False})


def send_the_homepage(request):
    theIndex = open("static/index.html").read()
    return HttpResponse(theIndex)


def get_popular(request):
    response = requests.get(
        f"https://api.spoonacular.com/recipes/random?apiKey={api_key}&number=8"
    )
    return JsonResponse(response.json())
@api_view(["POST"])
def import_recipe(request):
    if request.method == 'POST':
        url = "https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi"
        payload = request.data['url']
        headers = {
            "content-type": "text/plain",
            "X-RapidAPI-Key": f"{import_api_key}",
            "X-RapidAPI-Host": "mycookbook-io1.p.rapidapi.com"
        }
        response = requests.request("POST", url, data=payload, headers=headers)
        json_data = response.json()
        
        print(json_data)
        return JsonResponse(json_data, safe=False)
        


@api_view(["GET", "POST"])
def browse(request):
    if request.method == "GET":
        # user_id = request.GET.get("user_id")
        user = User.objects.get(id=request.user.id)
        print(user)
        cookbooks = Cookbook.objects.filter(user=user.id)
        print(cookbooks)

        cookbook_recipes = CookbookRecipe.objects.filter(cookbook__in=cookbooks)
        print(cookbook_recipes)
        cookbook_data = []
        for cookbook_recipe in cookbook_recipes:
            cookbook = cookbook_recipe.cookbook
            section = cookbook_recipe.section
            recipe = cookbook_recipe.recipe

            cookbook_data.append(
                {
                    "id": cookbook.id,
                    "cookbook": cookbook.name,
                    "section": section.name,
                    "recipe": [
                        {
                            "name": recipe.name,
                            "instructions": recipe.instructions,
                            "ingredients": recipe.ingredients,
                            "description": recipe.description,
                            "time": recipe.time,
                            "quantity": recipe.quantity,
                        }
                    ],
                }
            )
            print(cookbook_data)
            json_data = json.dumps(cookbook_data)
        return HttpResponse(json_data, content_type="application/json")

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_storage(request):
    if request.method == "DELETE":
        cookbook = Cookbook.objects.get(id=request.data['cookbook_id'])
        cookbook.delete()
        return JsonResponse({'success': True})
    elif request.method == 'GET':
        user_id = request.user.id
        cookbooks = Cookbook.objects.filter(user=user_id)
        data = serialize('json', cookbooks)
        return HttpResponse(data, content_type="application/json")
    elif request.method == 'PUT':
        cookbook = Cookbook.objects.get(id=request.data['id'])
        cookbook.name = request.data['name']
        cookbook.save()
        return JsonResponse({'success': True})
    elif request.method == 'POST':
        user = User.objects.get(id=request.user.id)
        cookbook = Cookbook(user=user, name=request.data['name'])    
        cookbook.save()    
        return JsonResponse({'success': True})
    elif request.method == "DELETE":
        print('im in here')
        cookbook = Cookbook.objects.get(id=request.data['cookbook_id'])
        print(cookbook)
        cookbook.delete()
        return JsonResponse({'success': True})
    


def cookbooks_by_user(request, user_id):
    if request.method == "GET":
        cookbooks = Cookbook.objects.all().filter(user=user_id)
        data = serialize("json", cookbooks)
        return HttpResponse(data)


def cookbook_by_id(request, cookbook_id):
    if request.method == "GET":
        cookbook = Cookbook.objects.all().filter(id=cookbook_id)
        data = serialize("json", cookbook)
        print(data)
        return HttpResponse(data)


def sections_by_cookbook(request, cookbook_id):
    if request.method == "GET":
        sections = Section.objects.filter(cookbook=cookbook_id)
        data = serialize("json", sections)
        return HttpResponse(data)

@api_view(['POST', 'PUT', 'DELETE'])
def sections(request):
    if request.method == 'POST':
        cookbook = Cookbook.objects.get(id=request.data['cookbookId'])
        section = Section(cookbook=cookbook, name=request.data['name'])    
        section.save()    
        return JsonResponse({'success': True})
    elif request.method == "PUT":
        section = Section.objects.get(id=request.data['id'])
        section.name = request.data['name']
        section.save()
        return JsonResponse({'success': True})
    elif request.method == "DELETE":
        section = Section.objects.get(id=request.data['section_id'])
        section.delete()
        return JsonResponse({'success': True})

@api_view(['POST', 'PUT', 'DELETE'])
def recipes(request):
    if request.method == 'POST':
        cookbook = Cookbook.objects.get(id=request.data['cookbookId'])
        section = Section(cookbook=cookbook, name=request.data['name'])    
        section.save()    
        return JsonResponse({'success': True})
    elif request.method == 'PUT':
        print('updating :', request.data['recipe_id'])
        return JsonResponse({'success': True})
    elif request.method == "DELETE":
        recipe = Recipe.objects.get(id=request.data['recipe_id'])
        recipe.delete()
        return JsonResponse({'success': True})


def section_by_id(request, cookbook_id, section_id):
    if request.method == "GET":
        section = Section.objects.filter(cookbook=cookbook_id, id=section_id)
        data = serialize("json", section)
        return HttpResponse(data)


def recipes_by_section(request, section_id):
    if request.method == "GET":
        section = Section.objects.get(id=section_id)
        recipes = section.recipes.all()
        data = serialize("json", recipes)
        return HttpResponse(data)


def recipe_by_id(request, cookbook_id, section_id, recipe_id):
    if request.method == "GET":
        cookbook = Cookbook.objects.get(id=cookbook_id)
        section = cookbook.section_set.get(id=section_id)
        recipe = section.recipes.filter(id=recipe_id)
        print(recipe)
        data = serialize("json", recipe)
        return HttpResponse(data)

@api_view(["POST"])
def recipe(request):
    if request.method == "POST":
        name = request.data['name']
        instructions = request.data['instructions']
        ingredients = request.data['ingredients']
        description = request.data['description']
        image_url = request.data['imageUrl']
        quantity = request.data['quantity']
        time = request.data['time']
        cookbook_id = request.data['cookbookId']
        section_id = request.data['sectionId']

        cookbook = Cookbook.objects.get(id=cookbook_id)
        section = Section.objects.get(id=section_id)
        new_recipe = Recipe(name=name, instructions=instructions, ingredients=ingredients, description=description, image_url=image_url, quantity=quantity, time=time)
        new_recipe.save()

        cookbook_recipe = CookbookRecipe(cookbook=cookbook, section=section, recipe=new_recipe)
        cookbook_recipe.save()
        
        
        print(request.data)
        return HttpResponse({'success': True})


# @api_view(["GET", "PUT", "DELETE"])
# def category(request, category_id):
#     if request.method == 'GET':
#         qs = Category.objects.filter(id=category_id)
#         data = serialize('json', qs, fields=('title'))
#         return HttpResponse(data, content_type='application/json')

#     elif request.method == 'PUT':
#         print(request.data)
#         title = request.data['title']
#         Category.objects.filter(id=category_id).update(title=title)
#         return JsonResponse({'success': True, 'title': request.data["title"]})

#     elif request.method == 'DELETE':
#         category_id = request.data['id']
#         Category.objects.filter(id=category_id).delete()
#         return JsonResponse({'success': True, 'id': category_id})


# @api_view(["GET"])
# def posts(request):
#     if request.method == 'GET':
#         qs = Post.objects.all().order_by('id')
#         data = serialize('json', qs, fields=('title', 'content', 'category'))

#         return HttpResponse(data, content_type='application/json')


# @api_view(["GET", "PUT"])
# def post(request, post_id):
#     if request.method == "GET":
#         qs = Post.objects.filter(id=post_id)
#         data = serialize('json', qs, fields=('title', 'content', 'category'))
#         print(data)
#         return HttpResponse(data, content_type='application/json')
#     elif request.method == "PUT":
#         content = request.data['content']
#         Post.objects.filter(id=post_id).update(content=content)
#         return JsonResponse({'success': True, 'title': request.data["content"]})


# @api_view(["GET", "POST"])
# def category_posts(request, category_id):
#     """
#         GET: Return all posts for a specific category
#         POST: Create a new post for a specific category
#     """
#     if request.method == "GET":
#         qs = Post.objects.filter(category=category_id)
#         data = serialize('json', qs, fields=('title', 'content', 'category'))
#         return HttpResponse(data, content_type='application/json')
#     elif request.method == "POST":
#         print(request)
#         title = request.data['title']
#         category = request.data['category']
#         content = request.data['content']
#         newPost = Post(title=title, category_id=category, content=content)
#         newPost.save()
#         return JsonResponse({'success': True, 'title': request.data['title']})


# @api_view(["GET"])
# def category_post(request, category_id, post_id):

#     pass
