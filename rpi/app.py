from flask import Flask, request
from playsound import playsound
from helpers.helpers import helperA

## local import
from actrelay import firethisbitch

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

@app.route('/fire')
def fireitup():
	firethisbitch()
	print("Fired this device")
    return 'fired'


@app.route('/pong')
def pong():
	arg1 = request.args.get('arg1')
	out = helperA(int(arg1))
	return "Hello" + str(out)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')