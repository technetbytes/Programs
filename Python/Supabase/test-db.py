import supabase

# set up supabase client
SUPABASE_URL = 'https://zxzrwjhmjzesxktrijca.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4enJ3amhtanplc3hrdHJpamNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5OTY2MTUsImV4cCI6MTk5OTU3MjYxNX0.g62cT0Bls3IsHl-7vZfiDQZvtkJHwOIJXimZ58O-Yho'
supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

data = [{
    'id': 2,
    'name': 'A',
    'age': 22,
    'gender':"Female"
},
{
    'id': 3,
    'name': 'C',
    'age': 20,
    'gender':"Male"
},
{
    'id': 4,
    'name': 'D',
    'age': 12,
    'gender':"Male"
},
{
    'id': 5,
    'name': 'Ali',
    'age': 32,
    'gender':"Male"
}
]
# insert data into supabase table
table_name = 'saqib_ullah'
# Chect JSON data
print(data)
# Insert JSON data into table
supabase_client.table(table_name).insert(data).execute()
# Query Data from the table
query_data = supabase_client.table(table_name).select('*').execute().data
print(query_data)