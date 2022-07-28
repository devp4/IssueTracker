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

    def get_groups(self, user_id):
        with self.connection as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM groups WHERE user_id=%s", (user_id,))

                list_groups = cursor.fetchall()

        groups = []

        for group in list_groups:
            val = {
                "user_id": group[0],
                "group_id": group[1],
                "name": group[2]
            }

            groups.append(val)

        return groups

    def delete_group(self, group_id):
        with self.connection as conn:
            with conn.cursor() as cursor: 
                cursor.execute("DELETE FROM groups WHERE group_id=%s", (group_id,))

        return group_id
    
    def check_group(self, group_id):
        with self.connection as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM groups")

                list_groups = cursor.fetchall()

        group_codes = {}

        for group in list_groups:
            group_codes.append(group[1])

        if group_id in group_codes:
            return True
        
        return False

    def get_projects(self, group_id):
        with self.connection as conn:
            with conn.cursor() as cursor: 
                cursor.execute("SELECT * FROM projects WHERE group_id=%s", (group_id,))

                list_projects = cursor.fetchall()

        projects = []

        # Convert list of projects into JSON format
        for project in list_projects:
            projects.append({
                "id": project[0],
                "group_id": project[1],
                "title": project[2],
                "description": project[3],
                "language": project[4],
                "is_open": project[5],
                "time": project[6],
                "created_by": project[7]
            })
        
        return projects

    def create_project(self, data):
        ''''
        Add new row into Projects table with given data
        
        Args:
            data: 
                {   
                    group_id: str
                    title: str
                    description: str
                    language: str
                    is_open: bool
                    time: str
                    created_by: str
                }
        '''
        with self.connection as conn:
            with conn.cursor() as cursor: 
                status = cursor.execute('''
                            INSERT INTO projects (group_id, title, description, language, is_open, time, created_by)
                            VALUES(%(group_id)s, %(title)s, %(description)s, %(language)s, %(is_open)s, %(time)s, %(created_by)s) RETURNING id''', data)
                
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

