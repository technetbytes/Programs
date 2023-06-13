import sqlite3

def db_table_exist(cursor):
    #get the count of tables with the name
    try:
        cursor.execute('Select * from topic_file')
        return True
    except Exception as e:        
        return False

def db_init(cursor):
    cursor.execute('''CREATE TABLE topic_file
         (ID INTEGER PRIMARY KEY autoincrement,
         topic           TEXT    NOT NULL,
         category            INT     NOT NULL,
         filename        CHAR(200),
         date_created datetime default current_timestamp);''')
    print("Table created successfully")

def insert_data(cursor, topic, category, filename):
    cursor.execute(
        "insert into topic_file (topic, category, filename) values (?, ?, ?)",
        (topic, category, filename)
    )

if __name__=="__main__":
    conn = sqlite3.connect("tutorial.db")
    cur = conn.cursor()
    if db_table_exist(cursor = cur) == False:
        db_init(cursor = cur)
        insert_data(cursor = cur, topic = "health care", category = "health", filename ="sfasf")
        # Commit your changes in the database    
        conn.commit()
    else:
        print("Table exist ...")
        insert_data(cursor = cur, topic = "health care", category = "health", filename ="sfasf")
        # Commit your changes in the database    
        conn.commit()            