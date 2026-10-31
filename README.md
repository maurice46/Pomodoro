![image](https://github.com/user-attachments/assets/86d99447-c3ae-48af-a601-86b7b633ed35)

Using Vite (lightweight web server to run react apps).
Frontend Initialization:
1) npm create vite@latest frontend 
2) npm install
3) npm run dev

I will be using Python's Flask, which is a lightweight and flexible web framework.
Allows developers to build web applications quickly and easily. 
It is designed to be simple and easy to use. 

Installation and Setup:
1) python -m venv backend 
2) backend\Scripts\activate
3) cd backend 
4) pip install flask flask-sqlalchemy flask-cors
5) 5) 'deactivate' for when I want to exit the virtual environment in the backend 

Creating my own version of the Pomodoro Technique Application.
Will include a Pomodoro 25 min timer, 5 min break, and 15 min break.
A task bar for the user to add, update, and delete tasks.

Pomodoro Components:
- Start Timer
- Reset Timer
- Stop Timer
- Update Pomodoro Timer
- Reset timer when switching from one timer to another

Task Components:
- Add a task
- Delete a task
- Display the tasks 

Flask Restful provides an API, which is a way to build RESTful API's in Flask. 
Resource: Represents a single endpoint in the API 
reqparse: A utility for parsing and validating request data 

I create a flask application instance, using the app object to represent the entire flask application.
app = Flask(__name__)

The database configuration specifies the database connection string. 
sqlite:///database.db indicates you are using a SQLite database and storing it in a file called database.db

I can initialize the SQLAlchemy database instance within the flask app.
db = SQLAlchemy(app)

I created a class called "Task" which is the database model that has three fields. 
1) id: A unique integer identifier
2) title: A string field to store the tasks's title 
3) done: A boolean field to indicate whether a task is completed (set to false by default)

I create an API object for building RESTful API endpoints.
api = Api()

I define a parser (task_parser) for incoming API requests. 
1) title: a required string argument for the task title
2) done: a boolean argument indicating the task's completion status

task_parser = reqparse.RequestParser()
.add_argument('title', type=str, required=True)
.add_argument('done', type=bool, default=False)

Register the API resources (endpoints)
The /tasks is managed by the TaskListResource and the /task/<task_id> is managed by TaskResource because I need the id to delete the task. 

I=nitalize the database and api:
- db.init_app(app) connects the sqlalhchemy database to the flask app
- api.init_app(app) connects the RESTful API to the flask app

app.app_context() ensures the database tables are created within the flask app's context
db.create_all() creates the task table in the SQLite database if it doesn't already exit
app.run(debug=True) starts the flask server with debugging enabled


