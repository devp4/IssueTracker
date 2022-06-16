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

        #TEST
        self.cursor.execute(f"INSERT INTO projects VALUES({1}, 'test', 'test2', 'test3', {True})")
        self.connection.commit()


