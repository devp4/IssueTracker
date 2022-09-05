class Group: 

    def __init__(self, connection) -> None:
        self.connection = connection
    
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
                
        found = False
        name = ""
        
        for group in list_groups:
            if group[1] == group_id:
                found = True
                name = group[2]

        if found:
            return (True, group_id, name)
        
        return (False, group_id, name)
    