from bs4 import BeautifulSoup
import csv
import datetime
import os
import subprocess
import pandas as pd


#mlr --csv put '$filename=FILENAME' then unsparsify --fill-with "" then reorder -f filename crs.csv impala.csv > output.csv
filenames =os.listdir('merge_html/')
filename_without_extension =[f.split('.')[0] for f in filenames]

filename_without_extension = [os.path.splitext(f)[0] for f in filenames]
#print(filename_without_extension)
csv_files = []
for each_file in filename_without_extension:
    company_name = ''
    company_url = ''
    headcounts_array = []
    headcounts_columns=[]

    csv_file_name = each_file+".csv"
    csv_files.append(csv_file_name)
    company_html = "merge_html/"+each_file+".html"
    company_url = "https://linkedin.com/company/"+each_file
    #print(csv_file_path)
    with open("csv/"+csv_file_name, 'w', newline='', encoding='utf-8') as resultfile:
        writer = csv.writer(resultfile)
        print(company_html)
        page = open(company_html, encoding="utf8")
        soup = BeautifulSoup(page.read(), 'html.parser')

        # find ul of headcounts container
        ul = soup.find('ul', class_='artdeco-carousel__slider ember-view')

        # finding li of ul container
        for li in ul.find_all('li'):
            #print("--=====================")
            # print(city.find_all('div', {'class' : 'insight-container'}))
            detail_box = li.find_all('div', {'class': 'insight-container'})

            for d2 in detail_box:
                headcounts_array.append(d2.text)
        # appending relevant columns to an array
        headcounts_columns.append(headcounts_array[0])
        headcounts_columns.append(headcounts_array[2])

        ###print(headcounts_columns)
        # # filtering the above array so that it only contains relevant information
        filtered_array = []
        for value in headcounts_columns:
            cleaned_values = [v.strip() for v in value.split('\n') if v.strip() not in ['What they do', 'Where they live', 'Add', 'toggle off']]
            cleaned_values = list(filter(None, cleaned_values))  # Remove empty elements
            filtered_array.append(cleaned_values)

        #             # Removing null indexes from an array after filtering it
            filtered_array = [arr for arr in filtered_array if any(arr)]

        #     # separating counts and their headings
            counts_array = []
            headings_array = []

        #             # removing spaces and commas from countries and replacing them with underscore( _ )
            for sublist in filtered_array:
                counts = []
                headings = []
                for item in sublist:
                    count = int(item.split()[0])
                    heading = ' '.join(item.split()[1:]).replace(',', '_').replace(' ', '_')
                    counts.append(count)
                    headings.append(heading)
                counts_array.append(counts)
                headings_array.append(headings)

        # print(company_url)
        # print(counts_array)
        # print(headings_array)


        #     # saving data into csv file for each company
        Date = datetime.date.today()

        if len(headings_array) > 1:    
            #     # Write the header row
            writer.writerow(['Date', 'Company_URL'] + headings_array[0] + headings_array[1])

            #     # Write the data rows
            writer.writerow([Date, company_url] + counts_array[0] + counts_array[1])

        #     # clearing headcounts array to remove previous companies data
        headcounts_columns.clear()
#For-Loop End Here

#print(os.getcwd())
cmd = "D:\Programs\Python\BeautifulSoup\csv\mlr --csv put '$filename=FILENAME' then unsparsify --fill-with \"\" then reorder -f filename " + ' '.join(csv_files) + " > merge.csv"
print(cmd)
os.chdir("D:/Programs/Python/BeautifulSoup/csv")
#print(os.getcwd())
os.system(cmd)
print("-Replacing Zero's-")
#replace all empty space with zero
df_new = pd.read_csv('D:/Programs/Python/BeautifulSoup/csv/merge.csv')
df_new = df_new.fillna(0)
df_new = df_new.iloc[: , 1:]
df_new.to_csv('D:/Programs/Python/BeautifulSoup/csv/merge.csv')
print("-Done-")
#subprocess.call(cmd,cwd=os.getcwd())