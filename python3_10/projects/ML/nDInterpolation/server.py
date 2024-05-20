#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np
from scipy.interpolate import griddata

app = Flask(__name__)
CORS(app)

@app.route('/nD_interpolation', methods=['POST'])
def nD_interpolation_numbers():
    tr_json = request.get_json()
    inputData = tr_json['inputData']
    paramData = tr_json['paramData']
    pointsData = tr_json['pointsData']

    print(inputData)
    print(paramData)
    print(pointsData)

    return jsonify({ })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7003)
