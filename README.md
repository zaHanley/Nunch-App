[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9536779&assignment_repo_type=AssignmentRepo)
# Project 4 - Your Forum - Django CRUD API

## Challenge

You have many topics of interest (like music, art, sports, and that one movie with the dog) and you have strong opinions about all of them. And you are just sick and tired of not having a forum where you can debate these topics with someone other than yourself.

You think to yourself: 'there are probably so many people that feel the same way and would love an app like this'!.

You've decided to create a full stack web app using django and react.

So far you have completed

- creating and connecting a django project and react project
- creating the front end UI with the integration of api calls
- creating your api routes in your app `urls.py`
- scaffolding out your `views.py`

### Routes you would like to implement:

| URL                                                | Method   | Description                                 |
| -------------------------------------------------- | -------- | ------------------------------------------- |
X| `categories/`                                      | `GET`    | Get a list of all categories                |
X| `categories/`                                      | `POST`   | Create a new category                       |
X| `categories/<int:category_id>`                     | `GET`    | Get a specific category                     |
X| `categories/<int:category_id>`                     | `PUT`    | Update a specific category                  |
X| `categories/<int:category_id>`                     | `Delete` | Delete a specific category                  |
X| `posts/`                                           | `GET`    | Get a list of all posts                     |
X| `posts/<int:post_id>`                              | `GET`    | Get a specific post                         |
X| `posts/<int:post_id>`                              | `PUT`    | Update a specific post                      |
X| `categories/<int:category_id>/posts`               | `GET`    | Get all posts for a specific category       |
X| `categories/<int:category_id>/posts`               | `POST`   | Create a new post for a specific category   |
| `categories/<int:category_id>/posts/<int:post_id>` | `GET`    | Get a specific post for a specific category |

## Your task

- create some models
- implement the api views in `views.py`

> \*\*make sure to provide some seed data in the form of fixtures before submitting the project\*\* --- hint: django's `dumpdata` command

## Models

You will need to create two models. `Category` and `Post`

### The `Category` model:

- attributes:
  - id (autogenerated)
  - title
- constraints: a category can have many posts

### The `Post` model:

- attributes:
  - id (autogenerated)
  - title
  - content
- constraints: you may choose whether a post must belong to one category or if it can belong to many

You may choose either relationship:

- `one-to-many`
- `many-to-many`

## Setup

- DB - postgresql:

  - create a database with the name `assessment_4`

- Django set up:

  - create a `.venv` and activate it
  - install python dependencies from `requirements.txt`
    ```sh
    pip install -r requirements.txt
    ```
  - run the server
    ```sh
    python manage.py runserver
    ```

- React set up:
  - Install project `node_modules`
    ```sh
      npm install
    ```
  - run the build watch script
    ```sh
      npm run build:watch
    ```

## Views

- give the `@api_view` decorator the correct parameters (what request methods do we want to allow our function to process? )

- Your view functions in `views.py` must return an appropriate JsonResponse based on the request

  > ex: in `views.categories`, if the method is `GET` you will need to send back a `JsonResponse` containing a list of category data in the form of an object

  > if your data is not being formatted correctly into a json format look into `serializers` or `json_view`


## Optional (if you would like to expand further):

- Add polls to your site

  - create a data model or few that would handle poll data. (ex: `Poll`, `Choice` where each `poll` could have many `choices`)
  - create an api route to get all polls (this will send the choices as well)
  - write your view function
  - extend your ui and add components and functionality that will get the polls from the api and display them on the screen for the user

- Vote on a poll in the UI and have it reflect back in the database
- Style the app (use components and styles from react-bootstrap or another library)

## Resources

- [react styling and css FAQ](https://reactjs.org/docs/faq-styling.html)


