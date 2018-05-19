from flask import Flask
from playsound import playsound

app = Flask(__name__)

@app.route('/')
def index():
    playsound('/home/pi/webapp/completed.wav')
    print("ITS WORKING")
    print("Yuan was here")
    return 'something'

@app.route('/pyrotechnica')
def pyratechnica():
    return 'something explosive'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')