import schedule
import time
  
def func():
    print("Geeksforgeeks")
  
schedule.every(10).seconds.do(func)
  
while True:
    schedule.run_pending()
    time.sleep(1)