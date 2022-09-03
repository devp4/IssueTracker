class Projects:
    # Operations for Projects Table
    
    def __init__(self, connection) -> None:
        self.connection = connection

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