from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# Create a new instance of the Firefox driver
driver = webdriver.Firefox()

# Navigate to the webpage you want to refresh and scroll
driver.get("https://yahoo.com")

# Set the refresh interval (in seconds)
refresh_interval = 60

# Set the scroll duration (in seconds)
scroll_duration = 10

# Continuously refresh and scroll the page
while True:
    # Refresh the page
    driver.refresh()

    # Wait for the page to load
    time.sleep(5)

    # Scroll to the bottom of the page
    driver.find_element_by_tag_name('body').send_keys(Keys.END)
    time.sleep(scroll_duration)

    # Scroll to the top of the page
    driver.find_element_by_tag_name('body').send_keys(Keys.HOME)
    time.sleep(scroll_duration)

    # Wait for the specified refresh interval before refreshing again
    time.sleep(refresh_interval)

# Close the browser
driver.quit()
