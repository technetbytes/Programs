import supabase

# set up supabase client

SUPABASE_URL = 'https://eblvtasvpsnbridenkmb.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHZ0YXN2cHNuYnJpZGVua21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQxODU1MTQsImV4cCI6MTk5OTc2MTUxNH0.hNpBgsS6sCgeROQkpEwrjVr1MumnGGewc3GN78eruS4'
supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

#SUPABASE_URL = 'https://zxzrwjhmjzesxktrijca.supabase.co'
#SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4enJ3amhtanplc3hrdHJpamNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5OTY2MTUsImV4cCI6MTk5OTU3MjYxNX0.g62cT0Bls3IsHl-7vZfiDQZvtkJHwOIJXimZ58O-Yho'
#supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)


data = [
{
    'company_name': 'cmpany_name',
    'job_title': 'job_title',
    'description': 'get_job_description',
    'application_link': 'href22',
    'city': 'get_location',
    'country': ['country'],
    'job_category': ['get_job_category'],
    'job_type': ['get_job_type'],
    'location_type': ['get_location_type'],
    'years_of_experience': 'get_expereince',
    'salary': '11',
    'date_posted': 'formatted_date',
    'company_link': 'website_url',
    'company_logo': '',
    'job_board': 'job_board',
    'job_board_link': 'job_board_link'
}
                                            ]
# insert data into supabase table
table_name = 'jobs'
# Chect JSON data
print(data)
# Insert JSON data into table
supabase_client.table(table_name).insert(data).execute()
# Query Data from the table
query_data = supabase_client.table(table_name).select('*').execute().data
print(query_data)