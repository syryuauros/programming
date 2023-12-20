#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np
import math

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
    T = 1/Fs
    end_time = 1
    time = np.linspace(0, end_time, Fs)

    s_fft = np.fft.fft(col1.astype(float))
    amplitude = abs(s_fft)/len(s_fft)
    phase = np.angle(s_fft)
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


@app.route('/FFTMulti', methods=['POST'])
def FFTMulti_numbers():

    tr_json = request.get_json()
    data = tr_json['data']
    check = tr_json['check']
    truncate_ratio = tr_json['truncateRatio']
    show_elem_origin = np.array(data)

    if not can_be_float(show_elem_origin[0,:]):
        show_elem_origin = np.delete(show_elem_origin, 0, axis=0)
    else:
        show_elem_origin = show_elem_origin

    inpt_elem = show_elem_origin.astype(float)
    iFFT_elem = inpt_elem.copy()
    amp_elem = inpt_elem.copy()
    phs_elem = inpt_elem.copy()
    real_elem = inpt_elem.copy()
    imag_elem = inpt_elem.copy()

    inpt0 = inpt_elem[:,0].astype(float)
    inpt1 = inpt_elem[:,1].astype(float)

    Fs = len(inpt0)
    T = 1/Fs
    end_time = 1
    time = np.linspace(0, end_time, Fs)

    s_fft1 = np.fft.fft(inpt1.astype(float))
    frequency = np.fft.fftfreq(len(s_fft1), T)

    iFFT_elem[:,0] = inpt0
    amp_elem[:,0] = frequency.astype(str)
    phs_elem[:,0] = frequency.astype(str)
    real_elem[:,0] = frequency.astype(str)
    imag_elem[:,0] = frequency.astype(str)

    for i in range(1, len(inpt_elem[0])):

        inptN = inpt_elem[:,i].astype(float)

        s_fftN = np.fft.fft(inptN.astype(float))
        amplitudeN = abs(s_fftN)/len(s_fftN)
        phaseN = np.angle(s_fftN)

        if not check:
            s_iFFTN = np.fft.ifft(s_fftN).real
            complexelemN = amplitudeN.astype(float) * np.exp(1j * phaseN.astype(float))

            iFFT_elem[:,i] = s_iFFTN.astype(str)
            amp_elem[:,i] = amplitudeN.astype(str)
            phs_elem[:,i] = phaseN.astype(str)
            real_elem[:,i] = complexelemN.real.astype(str)
            imag_elem[:,i] = complexelemN.imag.astype(str)
        else:
            s_fftL = s_fftN.copy()
            amplitudeL = amplitudeN.copy()
            phaseL = phaseN.copy()

            tr_ratio = float(truncate_ratio)/100
            amplitudeL[amplitudeN/amplitudeN.max() < tr_ratio] = 0
            s_fftL[amplitudeN/amplitudeN.max() < tr_ratio] = 0
            phaseL[amplitudeN/amplitudeN.max() < tr_ratio] = 0

            s_iFFTL = np.fft.ifft(s_fftL).real
            complexelemL = amplitudeL.astype(float) * np.exp(1j * phaseL.astype(float))

            iFFT_elem[:,i] = s_iFFTL.astype(str)
            amp_elem[:,i] = amplitudeL.astype(str)
            phs_elem[:,i] = phaseL.astype(str)
            real_elem[:,i] = complexelemL.real.astype(str)
            imag_elem[:,i] = complexelemL.imag.astype(str)

        iFFT_result = iFFT_elem.tolist()
        amp_result = amp_elem.tolist()
        phs_result = phs_elem.tolist()
        real_result = real_elem.tolist()
        imag_result = imag_elem.tolist()

    return jsonify({
        'iFFT_result': iFFT_result,
        'amp_result': amp_result,
        'phs_result': phs_result,
        'real_result': real_result,
        'imag_result': imag_result,
    })

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
    yNew = np.interp(xNew, col0, col1).astype(float)

    result = np.column_stack((xNew.astype(str), yNew.astype(str)))
    dataModified = result.tolist()

    return jsonify(dataModified)

@app.route('/intpMulti', methods=['POST'])
def intpMulti_numbers():
    tr_json = request.get_json()

    data = tr_json['data']
    rangeMin = tr_json['rangeMin']
    rangeMax = tr_json['rangeMax']
    interval = tr_json['interval']

    print(rangeMin, rangeMax, interval)

    show_elem_origin = np.array(data)

    if not can_be_float(show_elem_origin[0,:]):
        inpt_elem = np.delete(show_elem_origin, 0, axis=0)
    else:
        inpt_elem = show_elem_origin

    col0 = inpt_elem[:,0].astype(float)
    col1 = inpt_elem[:,1].astype(float)
    xNew = np.array(np.arange(float(rangeMin),float(rangeMax),float(interval))).astype(float)
    yNew_elem = np.interp(xNew, col0, col1).astype(float)

    for i in range(2, len(inpt_elem[0])):
        colN = inpt_elem[:,i].astype(float)
        yNew_elem = np.column_stack((np.interp(xNew, col0, colN).astype(float), yNew_elem))

    result = np.column_stack((xNew.astype(str), yNew_elem.astype(str)))
    dataModified = result.tolist()

    return jsonify(dataModified)


@app.route('/custom_sensitivity', methods=['POST'])
def custom_sensitivity_numbers():

    tr_json = request.get_json()
    data0 = tr_json['data0']
    data1 = tr_json['data1']
    data0Arr = np.array(data0).astype(float)
    data1Arr = np.array(data1).astype(float)
    data1ArrSort = data1Arr[data1Arr[:, 0].argsort()]

    p1Center = data0Arr[:,0]
    p2Center = data0Arr[:,2]
    p3Center = data0Arr[:,4]
    p1Delta = data0Arr[:,1]
    p2Delta = data0Arr[:,3]
    p3Delta = data0Arr[:,5]
    target = data0Arr[:,6]

    freq = data1ArrSort[:,0]
    p1_0 = data1ArrSort[:,1]
    p1_1 = data1ArrSort[:,2]
    p2_0 = data1ArrSort[:,3]
    p2_1 = data1ArrSort[:,4]
    p3_0 = data1ArrSort[:,5]
    p3_1 = data1ArrSort[:,6]
    sigma = data1ArrSort[:,7]

    s1 = (p1_1 - p1_0) / (2 * p1Delta)
    s2 = (p2_1 - p2_0) / (2 * p2Delta)
    s3 = (p3_1 - p3_0) / (2 * p3Delta)

    sNorm1 = s1* (p1Center) * target/100 /sigma
    sNorm2 = s2* (p2Center) * target/100 /sigma
    sNorm3 = s3* (p3Center) * target/100 /sigma

    sNorm1Cut = [x if abs(x) >= 1 else 0 for x in sNorm1]
    sNorm2Cut = [x if abs(x) >= 1 else 0 for x in sNorm2]
    sNorm3Cut = [x if abs(x) >= 1 else 0 for x in sNorm3]

    sZero = [0 for x in sNorm3]

    dataModifiedArr0 = np.array(sZero).astype(str)
    dataModifiedArr0 = np.column_stack((np.array(sZero).astype(str), dataModifiedArr0))
    dataModifiedArr0 = np.column_stack((np.array(sZero).astype(str), dataModifiedArr0))
    dataModifiedArr0 = np.column_stack((s3.astype(str), dataModifiedArr0))
    dataModifiedArr0 = np.column_stack((s2.astype(str), dataModifiedArr0))
    dataModifiedArr0 = np.column_stack((s1.astype(str), dataModifiedArr0))
    dataModifiedArr0 = np.column_stack((freq.astype(str), dataModifiedArr0))
    dataModifiedArr1 = np.array(sNorm3Cut).astype(str)
    dataModifiedArr1 = np.column_stack((np.array(sNorm2Cut).astype(str), dataModifiedArr1))
    dataModifiedArr1 = np.column_stack((np.array(sNorm1Cut).astype(str), dataModifiedArr1))
    dataModifiedArr1 = np.column_stack((sNorm3.astype(str), dataModifiedArr1))
    dataModifiedArr1 = np.column_stack((sNorm2.astype(str), dataModifiedArr1))
    dataModifiedArr1 = np.column_stack((sNorm1.astype(str), dataModifiedArr1))
    dataModifiedArr1 = np.column_stack((freq.astype(str), dataModifiedArr1))

    sCov12 = np.cov(s1, s2)[0,1] / math.sqrt(np.cov(s1, s2)[0,0] * np.cov(s1, s2)[1,1])
    sCov13 = np.cov(s1, s3)[0,1] / math.sqrt(np.cov(s1, s3)[0,0] * np.cov(s1, s3)[1,1])
    sCov23 = np.cov(s2, s3)[0,1] / math.sqrt(np.cov(s2, s3)[0,0] * np.cov(s2, s3)[1,1])

    sCov = [[1, sCov12, sCov13], [sCov12, 1, sCov23], [sCov13, sCov23, 1]]

    dataModified0 = dataModifiedArr0.tolist()
    dataModified1 = dataModifiedArr1.tolist()
    return jsonify({ 'data0': dataModified0, 'data1': dataModified1, 'dataCov':sCov, })


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
