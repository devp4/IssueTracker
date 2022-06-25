from flask import Flask, request
from database import Database

app = Flask(__name__)
db = Database()

@app.route("/api/test")
def home():
    return {"TEST": "HOME PAGE"}

@app.route("/api/create-project", methods=["POST"])
def create_project():
    data = request.get_json()
    proj_id = db.create_project(data=data)
    if proj_id:
        return {"id": proj_id}, 200
    
    return data, 404

@app.route("/api/delete-project/<project_id>", methods=["DELETE"])
def delete_post(project_id):
    status = db.delete_project(project_id=project_id)
    if status:
        return project_id, 200
    
    return project_id, 404