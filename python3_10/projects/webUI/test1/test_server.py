#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json

num3 = float(0)

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello, World!"

@app.route('/users', methods=["GET"])
def users():
    print("users endpoint reached...")
    with open("/home/auros/gits/programming/python3_10/projects/webUI/test1/users.json", "r") as f:
        data = json.load(f)
        data.append({
            "username": "user4",
            "pets": ["hamster"]
        })

        return flask.jsonify(data)

@app.route('/add', methods=['POST'])
def add_numbers():
    data = request.get_json()
    num1 = data['num1']
    num2 = data['num2']
    result = float(num1) + float(num2) + num3
    return jsonify({'result': str(result)})

@app.route('/add1', methods=['POST'])
def add1_numbers():
    data = request.get_json()
    # for sub_data in data:
    #     print(sub_data)
    print(type(data))
    show_elem = data[1][2]
    print(show_elem)
    num1 = data[1][1]
    num2 = data[3][1]
    result = float(num1) + float(num2) + num3
    return jsonify({'result': str(result)})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=6969)
    #app.run('localhost', 6969)

# @app.route('/add', methods=['POST'])
# def add_numbers():
#     data = request.get_json()
#     num1 = data['num1']
#     num2 = data['num2']
#     result = num1 + num2
#     return jsonify({'result': result})

# if __name__ == '__main__':
#     app.run(debug=True)
#
#
#https://tms-dev-blog.com/python-backend-with-javascript-frontend-how-to/
