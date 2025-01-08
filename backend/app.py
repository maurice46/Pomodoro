from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    done = db.Column(db.Boolean, default=False)

api = Api()
task_parser = reqparse.RequestParser()
task_parser.add_argument('title', type=str, required=True)
task_parser.add_argument('done', type=bool, default=False)

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

api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')

db.init_app(app)
api.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # creates tables
    
    app.run(debug=True)
