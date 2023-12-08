#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np

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

@app.route('/add2', methods=['POST'])
def add2_numbers():
    data = request.get_json()
    show_elem_origin = np.array(data)
    show_elem = np.delete(show_elem_origin, 0, axis=0)
    col0 = show_elem[:,0]
    col1 = show_elem[:,1]
    col2 = col1.astype(float) * 2
    # print(show_elem)
    # print("col0 = ")
    # print(col0)
    # print("col1 = ")
    # print(col1)
    show_elem[:,2] = col2.astype(str)
    print(show_elem)
    dataModified = show_elem.tolist()

    # num1 = data[1]
    # num2 = data[3]
    # result = float(num1) + float(num2) + num3
    # return jsonify({'result': str(result)})
    return jsonify(dataModified)

@app.route('/FFT', methods=['POST'])
def FFT_numbers():

    tr_json = request.get_json()
    data = tr_json['data']
    check = tr_json['check']
    truncate_ratio = tr_json['truncateRatio']
    show_elem_origin = np.array(data)

    if not can_be_float(show_elem_origin[0,:]):
        show_elem = np.delete(show_elem_origin, 0, axis=0)
    else:
        show_elem = show_elem_origin
    col0 = show_elem[:,0]
    col1 = show_elem[:,1]

    Fs = len(col0)
    print("Fs :" + str(Fs))
    T = 1/Fs
    end_time = 1
    time = np.linspace(0, end_time, Fs)

    s_fft = np.fft.fft(col1.astype(float))
    amplitude = abs(s_fft)*(2/len(s_fft))
    frequency = np.fft.fftfreq(len(s_fft), T)

    # fft_freq = frequency.copy()
    # peak_index = amplitude[:int(len(amplitude)/2)].argsort()[-1]
    # peak_freq = fft_freq[peak_index]
    # fft_lx = s_fft.copy()
    # fft_lx[fft_freq!=peak_freq] = 0
    # amplitude_lx = abs(fft_lx)*(2/len(fft_lx))

    # print("truncateRatio : " + str(truncate_ratio) + "," + str(tr_json))

    if not check:
        col2 = np.fft.ifft(s_fft).real
        col5 = amplitude.astype(str)
    else:

        fft_lx = s_fft.copy()
        amplitude_lx = amplitude.copy()
        tr_ratio = float(truncate_ratio)/100
        amplitude_lx[amplitude/amplitude.max() < tr_ratio] = 0
        fft_lx[amplitude/amplitude.max() < tr_ratio] = 0

        col2 = np.fft.ifft(fft_lx).real
        col5 = amplitude_lx.astype(str)

    show_elem[:,2] = col2.astype(str)
    show_elem[:,4] = frequency.astype(str)
    show_elem[:,5] = col5.astype(str)
    dataModified = show_elem.tolist()

    return jsonify(dataModified)

def can_be_float(arr):
    k = 0
    try:
        for element in arr:
            k = k + 1
            if element is not None:
                float(element)
            else:
                print("None type found in" + str(k) + "`th element")
    except ValueError:
        return False
    return True

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
#출처: https://lifelong-education-dr-kim.tistory.com/entry/Python-numpy-FFT-IFFT-사용하기-주기분석 [독학하는 김박사:티스토리]
