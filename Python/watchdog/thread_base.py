#main_watchdog.py
import time
import logging
import threading
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
import sys
from queue import Queue
import signal

q = Queue()
class Event(LoggingEventHandler):
    def on_created(self, event):
        print("firing ...")
        q.put(event.src_path)

def run_observer():
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    #path = sys.argv[1] if len(sys.argv) > 1 else '.'
    path = 'input_folder'
    event_handler = Event()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False)
    observer.start()
    while True:
        time.sleep(1)
        #print(threading.currentThread().name)


def simple_function():
    print("getting .....")
    print(q.get())

if __name__ == "__main__":
    background_thread = threading.Thread(target=run_observer, args=())
    background_thread.daemon = True
    background_thread.start()
    #background_thread.join()
    print('Business logic')
    while True:
        #val = q.get(True)
        simple_function()