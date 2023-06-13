import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import watchdog.events
import watchdog.observers
import time

class Watcher:

    def __init__(self, directory=".", handler=FileSystemEventHandler()):
        self.observer = Observer()
        self.handler = handler
        self.directory = directory

    def run(self):
        self.observer.schedule(
            self.handler, self.directory, recursive=True)
        self.observer.start()
        print("\nWatcher Running in {}/\n".format(self.directory))
        try:
            while True:
                time.sleep(1)
        except:
            self.observer.stop()
        self.observer.join()
        print("\nWatcher Terminated\n")


class csv_file_handler(watchdog.events.PatternMatchingEventHandler):
    def __init__(self):
        # Set the patterns for PatternMatchingEventHandler
        watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*.csv'],
                                                             ignore_directories=True, case_sensitive=False)
 
    def on_created(self, event):
        print("Watchdog received created event - % s." % event.src_path)
        # Event is created, you can process it now
 
    def on_modified(self, event):
        print("Watchdog received modified event - % s." % event.src_path)
        # Event is modified, you can process it now

class MyHandler(FileSystemEventHandler):

    # def on_any_event(self, event):
    #     print(event) # Your code here
    @staticmethod
    def on_any_event(event):
        if event.is_directory:
            return None
 
        elif event.event_type == 'created':
            # Event is created, you can process it now
            print("Watchdog received created event - % s." % event.src_path)
        elif event.event_type == 'modified':
            # Event is modified, you can process it now
            print("Watchdog received modified event - % s." % event.src_path)

if __name__=="__main__":
    w = Watcher("input_folder", csv_file_handler())
    w.run()