#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np
import math
import random

num3 = float(0)

app = Flask(__name__)
CORS(app)

@app.route('/DynamicPrec_delCols', methods=['POST'])
def DynamicPrec_delCols_numbers():

    tr_json = request.get_json()
    data1 = tr_json['data1']
    colsToBeDel = tr_json['colsToBeDel']
    data1Arr = np.array(data1).astype(str)
    columns_to_be_delete = [int(x) for x in colsToBeDel.split()]

    headers = data1Arr[0]
    data_essential = delete_columns(remove_empty_none_rows_decreasing(data1Arr),columns_to_be_delete)
    #freq = data1Arr[:,1::]

    return jsonify({ 'headers':headers.reshape(-1,1).tolist(), 'data':data_essential.tolist(), })

def remove_empty_none_rows_decreasing(arr):
    empty_none_row_mask = ~np.all(np.logical_or(arr == '', arr == 'None'), axis=1)
    print(empty_none_row_mask)

    modified_arr = arr[empty_none_row_mask, :]

    return modified_arr

def delete_columns(arr, columns_to_delete):
    return np.delete(arr, columns_to_delete, axis=1)

def delete_rows(arr, rows_to_delete):
    return np.delete(arr, rows_to_delete, axis=0)

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

def find_nearest(array, value):
    idx = np.abs(array - value).argmin()
    return idx

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
    app.run(host='0.0.0.0', port=7001)
#
#
#https://tms-dev-blog.com/python-backend-with-javascript-frontend-how-to/
#출처: https://lifelong-education-dr-kim.tistory.com/entry/Python-numpy-FFT-IFFT-사용하기-주기분석 [독학하는 김박사:티스토리]
