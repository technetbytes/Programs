from flask import Flask
import socket
app = Flask(__name__)
 
@app.route('/')
def servicehost():
    host_name = socket.gethostname()
    return 'Service is hosting by '+ host_name + ' v2'
 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)