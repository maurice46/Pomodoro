from flask_restful import Api, Resource, reqparse
from models import Task, db

# This file defines the RESTful API resources for the task management application.
# It includes endpoints for listing tasks, creating a new task, and deleting a task.
api = Api()
# task_parser is used to parse incoming request data for creating or updating tasks.
# parse is a method that extracts the arguments from the request and validates them.
task_parser = reqparse.RequestParser()
# Adding arguments to the parser for task creation and updates.
task_parser.add_argument('title', type=str, required=True)
task_parser.add_argument('done', type=bool, required=True)

class TaskListResource(Resource):
    def get(self):
        tasks = Task.query.all()
        return [{'id': t.id, 'title': t.title, 'done': t.done} for t in tasks]

    def post(self):
        args = task_parser.parse_args()
        task = Task(title=args['title'], done=args['done'])
        db.session.add(task)
        db.session.commit()
        return {'id': task.id, 'title': task.title, 'done': task.done}

class TaskResource(Resource):
    def delete(self, task_id):
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return "", 204


