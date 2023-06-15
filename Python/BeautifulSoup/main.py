from bs4 import BeautifulSoup
import re
# import urllib2

url = "D:\Programs\Python\BeautifulSoup\example.html"
page = open(url, encoding="utf8")
soup = BeautifulSoup(page.read())

ul = soup.find("body").find("ul")#
ul = soup.find('ul', {'class' : 'artdeco-carousel__slider ember-view'})

print(type(ul))
for li in ul.find_all('li'):
    print("--=====================")
    #print(city.find_all('div', {'class' : 'insight-container'}))
    detail_box = li.find_all('div', {'class' : 'insight-container'})
    for d2 in detail_box:
        type_box = d2.find('div',{'class':'insight-container__title'})
        # need to find where it is 'Where they live' or 'What they do'
        print(type_box)
        print("********************")
        print(type_box.find('h3',{'class':'t-16 t-bold t-black inline-block flex-1'}))
        print("********************")
        print('----------')
        #d2 = d.find_all('div')
        print((d2.find_all('div', {'class':'org-people-bar-graph-element__percentage-bar-info truncate full-width mt2 mb1 t-14 t-black--light t-normal'})))
# print(cities)