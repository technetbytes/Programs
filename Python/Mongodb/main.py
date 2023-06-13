from pymongo import MongoClient
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = "mongodb://retailadmin:admin123@10.0.0.144:27017/retailaudit&readPreference=secondary&directConnection=true&ssl=false"
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client['retailaudit']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()
   collection_name = dbname["backcheckresponses"]
   item_details = collection_name.find()
   for item in item_details:
   # This does not give a very readable output
    print(item)