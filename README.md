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

The Pomodoro has been giving me struggles because I can't count down the timer. 
I think it's because of the useEffect component and I don't think it's functioning properly. 

The main change so far for the Pomodoro was adding mode components. So far I have the Pomodoro strictly set to
25 minutes and to go from there. With the added modes, now I can switch from Pomodoro to either the short break 
or the long break. I also updated the return in the Pomodoro to make it look more realistic as well.

In the useEffect components, I don't need time to be a dependency for it. Once it was removed, the timer 
started to decrement each second.

For the CSS, I first wanted to create independent stylesheets for both the Pomodoro and todo components,
but when I saw what it looked like once I completed it, both were just boxes on top of each other and it 
didn't look like a good webpage. Instead, I updated the app component's CSS to make it look more realistic. 

I made sure to keep the Pomodoro at the top of the page because when it was next to each other and I added 
a task, the Pomodoro would go down as I added more and more tasks. By keeping it at the top, I can add as many tasks and the page will keep extending, but the Pomodoro will remain in its place.

Added back the Pomodoro CSS to fix the button layout, to make the buttons look nicer.

Now I want to add the Todo CSS to fix the delete button when I add a task. 
I added a Todo.css to fix the space between the input and the delete button. 
As well as the add button to make it look neater. 

Now, I want to make it so when you click on either the Pomodoro, short, or long-timer, that it be the name
if the current timer. 
I deleted the three mode components for each of the timers. Instead, I created a set mode and time component to set
the new mode and new time when the user clicks on one of the buttons. So on click, it'll not only change the stop
watch time, but also the current title as well.
I also want to fix the to-do component because any time I add a long paragraph, everything gets clumped together. 

--------------------------------------------------------------------------------------------------------------------

Now I want to create a backend. 
I will be using Python's Flask, which is a lightweight and flexible web framework.
Allows developers to build web applications quickly and easily. 
It is designed to be simple and easy to use. 

Installation and Setup:
1) python -m venv backend 
2) backend\Scripts\activate
3) cd backend 
4) pip install flask flask-sqlalchemy flask-cors flask-restful 
5) 'deactivate' for when I want to exit the virtual environment in the backend 

First I imported all the required things I think I'll need based on the other times I've used Flask.

CORS enables cross-origin resource sharing. Basically it allows my frontend to make API requests to my backend. 

SQLAlchemy is a library for managing and interacting with databases in Flask. I am using this database for the todo list in my pomodoro application.

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

Now it was time to create the API endpoints. I started first created a class called TaskListResource which takes in the argument "Resource".

The get method queries all tasks from the database and returns a list of the tasks in JSON format. Each task has an id, title, and done.

The post method parses the request body using task_parser. It creates a new task obect and saves it to the database. It returns a newly created task as a JSON object.

Now I needed to handle how I would delete the tasks. So I created another class called TaskResource and again takes in the argument "Resource".

In the delete method, it finds a task by its id. If the id is not found, it returns a 404 error.
Then it deletes the task from the database, and returns an empty response with a status code 204 (no content).

I then have to register the API resources (endpoints). 
The /tasks is managed by the TaskListResource and the /task/<task_id> is managed by TaskResource because I need the id to delete the task. 

I then initalize the database and api:
- db.init_app(app) connects the sqlalhchemy database to the flask app
- api.init_app(app) connects the RESTful API to the flask app

Then I can run the app by calling 
if __name__ == "__main__": 
This ensures the code only runs when executing this script directly.

app.app_context() ensures the database tables are created within the flask app's context.

db.create_all() creates the task table in the SQLite database if it doesn't already exit.

app.run(debug=True) starts the flask server with debugging enabled. 

Now I need to connect the backend with the frontend. I'll be using axios, which is a popular JavaScript library used to make HTTP requests from a browser or Node.js.

It is lightweight and simplifies the process of interacting with APIs.

Promised-Based:
- Axios uses JavaScript promises, making it easy to handle asynchronous requests with .then() and .catch()

cd frontend
npm install axios

There was an error with the database. I put the resources for the api, and the database and models in separate files because there was problems getting the instance of the database. 

Doing this fixed that issue and now I'm able to create the api that will send requests to the backend. 

In the frontend, I created an api.js file to handle all the API requests to the backend. This file includes functions to get tasks, add a task, and delete a task.

I also made an instance of an axios request that includes the flash backend url instead of implementing it directly in the todo file. 

In the Todo component, I made the following changes:
1. Fixed the missing closing brace in the `addTodo` function.
2. Updated the `onClick` event for the add and remove buttons to use arrow functions.
3. Added error handling for the `addTodo` and `removeTodo` functions.

These changes ensure that the Todo component works correctly with the backend API and handles errors appropriately.

I also want to keep track of pomodoro sessions as well. 

There were errors and I found out it was a broken virtual environment. I had to delete the Scripts folder which held the python stuff, and I think thats why I couldn't run 'python app.py' because it kept giving me a "No Python ...". So I created a new virtual environemtn inside my backend folder using 'python -m venv venv'. Then I activated the environment using 'venv\Scripts\activate' and then installed my dependencies. I ran the 'python app.py' now and it takes me the web page. 

Now the problem is nothing is being sent back and on the frontend the tasks part is showing "Error fetching tasks: Cannot read properties of undefined (reading 'data')". 

I found the error. For some reason in my Todo.jsx, when it called the useEffect it did the ".then(response..." twice because there was a second one right below it. After I removed the second one and refreshed the backend page, my tasks appeared again. 

