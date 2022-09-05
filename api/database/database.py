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
    

    