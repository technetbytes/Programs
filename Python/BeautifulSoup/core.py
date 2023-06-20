from bs4 import BeautifulSoup
import csv
import datetime

company_name = ''
company_url = ''
headcounts_array = []
headcounts_columns=[]

name = "criya"
csv_file_path = name+".csv"
company_url = "html/"+name+".html"
#print(csv_file_path)
with open("csv/"+csv_file_path, 'w', newline='', encoding='utf-8') as resultfile:
    writer = csv.writer(resultfile)

    page = open(company_url, encoding="utf8")
    soup = BeautifulSoup(page.read(), 'html.parser')

    # find ul of headcounts container
    ul = soup.find('ul', class_='artdeco-carousel__slider ember-view')

    # finding li of ul container
    for li in ul.find_all('li'):
        print("--=====================")
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

    print(company_url)
    print(counts_array)
    print(headings_array)


    #     # saving data into csv file for each company
    Date = datetime.date.today()

    #     # Write the header row
    writer.writerow(['Date', 'Company_URL'] + headings_array[0])

    #     # Write the data rows
    writer.writerow([Date, company_url] + counts_array[0])

    #     # clearing headcounts array to remove previous companies data
    headcounts_columns.clear()