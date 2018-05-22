from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    print("ITS WORKING")
    return 'something'

@app.route('/pyrotechnica')
def pyratechnica():
    return 'something explosive'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
