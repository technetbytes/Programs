from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import time
from selenium.webdriver.common.by import By


options = Options()
options.add_argument('--disable-dev-shm-usage')

# to avoid handshake failed with fatal error ssl_error_ssl  
#options.add_argument('--ignore-certificate-errors-spki-list')
#options.add_argument('--ignore-ssl-errors')
#options.add_argument('--ignore-certificate-errors')
# dont need to add following argument in the option otherwise get error of  'handshake failed; returned -1, SSL error code 1, net_error -101' 
#options.add_argument('--ignore-certificate-errors')

import os
if os.name == "nt":
    driver = webdriver.Chrome(executable_path="chromedriver.exe", options=options)
    driver2 = webdriver.Chrome(executable_path="chromedriver.exe", options=options)
elif os.name == "posix":
    from webdriver_manager.chrome import ChromeDriverManager
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    driver2 = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
 
driver.get("https://www.google.com")
print(driver.title)

driver2.get("https://www.sslproxies.org/")
#time.sleep(20)
#driver.refresh()
print(driver2.title)

while True:
    pass