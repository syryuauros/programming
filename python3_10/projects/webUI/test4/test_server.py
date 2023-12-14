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

@app.route('/FFT', methods=['POST'])
def FFT_numbers():

    tr_json = request.get_json()
    data = tr_json['data']
    check = tr_json['check']
    truncate_ratio = tr_json['truncateRatio']
    show_elem_origin = np.array(data)

    show_elem = show_elem_origin
    col0 = show_elem[:,0].astype(float)
    col1 = show_elem[:,1].astype(float)

    Fs = len(col0)
    print("Fs :" + str(Fs))
    T = 1/Fs
    end_time = 1
    time = np.linspace(0, end_time, Fs)

    s_fft = np.fft.fft(col1.astype(float))
    print(s_fft)
    amplitude = abs(s_fft)/len(s_fft)
    phase = np.angle(s_fft)
    #amplitude = abs(s_fft)*(2/len(s_fft))
    frequency = np.fft.fftfreq(len(s_fft), T)

    if not check:
        col2 = np.fft.ifft(s_fft).real
        col4 = amplitude.astype(str)
        col5 = phase.astype(str)
    else:

        fft_lx = s_fft.copy()
        phase_lx = phase.copy()
        amplitude_lx = amplitude.copy()
        tr_ratio = float(truncate_ratio)/100
        amplitude_lx[amplitude/amplitude.max() < tr_ratio] = 0
        fft_lx[amplitude/amplitude.max() < tr_ratio] = 0
        phase_lx[amplitude/amplitude.max() < tr_ratio] = 0

        col2 = np.fft.ifft(fft_lx).real
        col4 = amplitude_lx.astype(str)
        col5 = phase_lx.astype(str)

    complexelem = col4.astype(float) * np.exp(1j * col5.astype(float))
    show_elem[:,2] = col2.astype(str)
    show_elem[:,3] = frequency.astype(str)
    show_elem[:,4] = col4.astype(str)
    show_elem[:,5] = col5.astype(str)
    show_elem[:,6] = complexelem.real.astype(str)
    show_elem[:,7] = complexelem.imag.astype(str)
    dataModified = show_elem.tolist()

    return jsonify(dataModified)

@app.route('/iFFT', methods=['POST'])
def iFFT_numbers():

    tr_json = request.get_json()
    optionsInput = tr_json['optionsInput']
    data = tr_json['data']
    rangeMin = tr_json['rangeMin']
    rangeMax = tr_json['rangeMax']
    show_elem_origin = np.array(data)

    if not can_be_float(show_elem_origin[0,:]):
        show_elem_origin = np.delete(show_elem_origin, 0, axis=0)
    else:
        show_elem_origin = show_elem_origin

    sorted_indices = np.argsort(show_elem_origin.astype(float)[:, 0])
    show_elem = show_elem_origin.astype(float)

    col0 = show_elem[:,0].astype(float)
    if optionsInput=="ampPhase":
        amp = show_elem[:,1].astype(float)
        phase = show_elem[:,2].astype(float)
        col1 = amp * len(col0) * np.exp(1j * phase)
    else:
        cReal = show_elem[:,1].astype(float)
        cImag = show_elem[:,2].astype(float)
        col1 = (cReal + 1j * cImag) * len(col0)

    intensity = np.fft.ifft(col1).real
    time = np.array(np.arange(float(0), float(1), float(1/len(col1)))).astype(float) * (float(rangeMax)-float(rangeMin)) + float(rangeMin)

    dataModified = np.column_stack((time.astype(str), intensity.astype(str))).tolist()
    return jsonify(dataModified)


@app.route('/interpolate', methods=['POST'])
def interpolate_numbers():
    tr_json = request.get_json()

    data = tr_json['data']
    rangeMin = tr_json['rangeMin']
    rangeMax = tr_json['rangeMax']
    interval = tr_json['interval']

    show_elem_origin = np.array(data)

    if not can_be_float(show_elem_origin[0,:]):
        show_elem = np.delete(show_elem_origin, 0, axis=0)
    else:
        show_elem = show_elem_origin
    col0 = show_elem[:,0].astype(float)
    col1 = show_elem[:,1].astype(float)

    xNew = np.array(np.arange(float(rangeMin),float(rangeMax),float(interval))).astype(float)
    print("xnew:" + str(xNew))

    yNew = np.interp(xNew, col0, col1).astype(float)
    print("ynew:" + str(yNew))

    result = np.column_stack((xNew.astype(str), yNew.astype(str)))
    dataModified = result.tolist()

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

def find_peaks(arr):
    peak_indices = np.where((arr[1:-1] > arr[:-2]) & (arr[1:-1] > arr[2:]))[0] + 1
    return peak_indices

def find_max_indices(arr):
    max_indices = np.where((arr == np.max(arr)))[0]
    return max_indices

def find_min_indices(arr):
    min_indices = np.where((arr == np.min(arr)))[0]
    return min_indices

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
