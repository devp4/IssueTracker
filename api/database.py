import psycopg2
import json 

class Database:

    def __init__(self):
        self.connection = None
        self.start()

    def start(self):
        with open("config.json") as file:
            self.config = json.load(file)
        
        self.connection = psycopg2.connect(**self.config)

    def __del__(self):
        self.connection.close()

    def get_projects(self):
        with self.connection as conn:
            with conn.cursor() as cursor: 
                cursor.execute("SELECT * FROM projects")

                list_projects = cursor.fetchall()
        
        projects = []

        # Convert list of projects into JSON format
        for project in list_projects:
            projects.append({
                "id": project[0],
                "title": project[1],
                "description": project[2],
                "language": project[3],
                "is_open": project[4],
                "time": project[5]
            })
        
        return projects

    def create_project(self, data):
        ''''
        Add new row into Projects table with given data
        
        Args:
            data: 
                {
                    title: str
                    description: str
                    language: str
                    is_open: bool
                    time: str
                }
        '''
        with self.connection as conn:
            with conn.cursor() as cursor: 
                status = cursor.execute('''
                            INSERT INTO projects (title, description, language, is_open, time)
                            VALUES(%(title)s, %(description)s, %(language)s, %(is_open)s, %(time)s) RETURNING id''', data)
                
                proj_id = cursor.fetchone()[0]

        if status == None:
            # SUCCESS
            return proj_id

        # FAIL
        return False

    def delete_project(self, project_id):
        ''''
        Delete project given project id
        
        Args:
            id: int
        
        '''
        with self.connection as conn:
                with conn.cursor() as cursor:                     
                    status = cursor.execute('''
                                DELETE FROM projects 
                                WHERE id=%s''', (project_id,))

        if status == None:
            # SUCCESS
            return True

        # FAIL
        return False

    def update_project(self, data):
        '''
        Update project given new data 
                
        Args:
            data: 
                {   
                    id: int
                    title: str
                    description: str
                    language: str
                    is_open: bool
                    time: str
                }
        '''

        with self.connection as conn:
            with conn.cursor() as cursor:
                status = cursor.execute('''
                    UPDATE projects SET 
                    title = %(title)s, description = %(description)s, language = %(language)s, is_open = %(is_open)s
                    WHERE id = %(id)s
                ''', data)
        
        if status == None:
            return True
        
        return False

