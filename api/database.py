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
    
    def create_user(self, user_info):
        ''' 
        Add a new user to Users table

        user_info: dict 
            id: string 
            username: string
            email: string
        '''

        with self.connection as conn:
            with conn.cursor() as cursor:
                status = cursor.execute('''
                    INSERT INTO users VALUES (%(id)s, %(email)s, %(username)s)
                    ON CONFLICT DO NOTHING
                ''', user_info)

        if status == None:
            return user_info
        
        return False
    
    def create_group(self, group_data):
        '''
        Add group to Groups table
        '''
        import random
        import string

        code = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
        group_data["group_id"] = code
        
        with self.connection as conn:
            with conn.cursor() as cursor:
                status = cursor.execute('''
                    INSERT INTO groups VALUES (%(user_id)s, %(group_id)s, %(name)s)
                ''', group_data)
        
        if status == None:
            return code 
        
        return False

    def get_groups(self, user):
        pass

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

