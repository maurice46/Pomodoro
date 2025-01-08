from flask import Flask
from flask_cors import CORS
from models import db
from resources import api, TaskListResource, TaskResource

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<int:task_id>')

db.init_app(app)
api.init_app(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # creates tables
    
    app.run(debug=True)
