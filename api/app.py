from flask import Flask, request
from database import Database

app = Flask(__name__)
db = Database()

@app.route("/api/create-user", methods=["POST"])
def create_user():
    user_info = request.get_json()
    user = db.create_user(user_info=user_info)
    if user:
        return user, 200
    
    return user, 404

@app.route("/api/create-group", methods=["POST"])
def create_group():
    data = request.get_json()
    group_id = db.create_group(group_data=data)

    if group_id:
        return {"group_id": group_id}, 200
    
    return group_id, 404


@app.route("/api/projects", methods=["GET"])
def get_projects():
    projects = db.get_projects()
    projects.reverse()
    
    if projects:
        return {"projects": projects}, 200
    
    return projects, 404
    
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

@app.route("/api/update-project", methods=["POST"])
def update_project():
    data = request.get_json()
    status = db.update_project(data)

    if status:
        return {"status": "updated"}, 200
    
    return {"status": "failed"}, 404