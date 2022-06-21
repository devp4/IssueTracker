import psycopg2
import json 

class Database:

    def __init__(self):
        self.config = {}
        
        self.get_config()
        self.start()
    
    def __del__(self):
        self.cursor.close()
        self.connection.close()

    def get_config(self):
        with open("config.json") as file:
            self.config = json.load(file)

    def start(self):
        self.connection = psycopg2.connect(**self.config)
        self.cursor = self.connection.cursor()
    
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
                }
        '''
        
        status = self.cursor.execute('''
                    INSERT INTO projects (title, description, langauge, open)
                    VALUES(%(title)s, %(description)s, %(language)s, %(is_open)s)''', data)

        if status == None:
            # SUCCESS
            self.connection.commit()
            return True
        else:
            # FAIL
            return False

    def delete_project(self, project_id):
        ''''
        Delete project given project id
        
        Args:
            id: int
        
        '''

        status = self.cursor.execute('''
                    DELETE FROM projects 
                    WHERE id=%s''', (project_id))
        print(status)
        if status == None:
            # SUCCESS
            self.connection.commit()
            return True
        else:
            # FAIL
            return False


