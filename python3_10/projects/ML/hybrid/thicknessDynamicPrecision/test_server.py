#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np
import math
import os
# import random
# import pandas as pd
from sklearn.model_selection import train_test_split
import lightgbm as lgbm  # light gradient boosting machine


num3 = float(0)

app = Flask(__name__)
CORS(app)

models = {}
@app.route('/DynamicPrec_train', methods=['POST'])
def DynamicPrec_train_numbers():

    tr_json = request.get_json()
    data1 = tr_json['data1']
    header1 = tr_json['header1']
    data1Arr = np.array(data1).astype(str)
    header1Arr = np.array(header1).astype(str)
    print('empty or null cell indices(if it represent [] then fine!!):' ,find_empty_indices(data1Arr))

    data1_mod1 = data1Arr.astype(float)
    thickness = data1_mod1[:,1]
    header1_mod1 = insert_col_left(header1Arr, [ 'NTh'], axis=0)
    #header1_mod1 = insert_col_left(header1Arr, [ 'Index', 'NTh'], axis=0)

    cuttingRatio = 0.1
    cuttingIndices = [-1]
    avgs = []
    nominalThickness = []
    indices = []
    k = 0
    thicknessNum = len(thickness) - 1

    for i in range(thicknessNum):
        if thickness[i+1] > thickness[i]*(1+cuttingRatio) or thickness[i+1] < thickness[i]*(1-cuttingRatio) :
            cuttingIndices.append(i)
    cuttingIndices.append(thicknessNum)

    for i in range(len(cuttingIndices)-1):
        startingIndex = cuttingIndices[i]+1
        endIndex = cuttingIndices[i+1]+1
        rangedThickness = thickness[startingIndex:endIndex]
        avg = sum(rangedThickness)/(len(rangedThickness))
        avgs.append(avg)
        for j in range(endIndex-startingIndex):
            nominalThickness.append(avg)
            indices.append(k)
            k = k + 1
        #print(startingIndex, endIndex, len(rangedThickness), avg, sum(rangedThickness))

    data1_mod2 = insert_col_left(data1_mod1, nominalThickness)
    train_Y = data1_mod2[:,[2]]
    train_X = data1_mod2[:,3:(len(data1_mod2[0]))]

    #data1_mod2_1 = insert_col_left(data1_mod1, nominalThickness)
    #data1_mod2 = insert_col_left(data1_mod2_1, indices)
    #train_data = pd.DataFrame(data1_mod2, columns= header1_mod1.tolist())
    #train_data = train_data.set_index('Index')
    #print(train_data)
    # train_Y = train_daoc[:,[0]]
    # train_X = train_data.iloc[:,3:(len(data1_mod2[0])-1)]

    print(train_X)
    print(train_Y)

    trn_X, tst_X, trn_y, tst_y = train_test_split(train_X, train_Y, test_size=0.05, shuffle=True)

    lgb_param = {'objective': 'regression',
                'n_estimators': 100,
                'drop_rate': 0.8,
                'skip_drop': 0.8,
                'learning_rate' : 0.5,
                'max_depth' : 6,
                'random_state' : 42,
                'metric' : 'l1',   # L1=abs(Y-f(x)), L1 means how different the two values are
                'colsample_bytree' : 0.7,
                'subsample' : 0.7,
                'num_leaves' : 6,
                }

    trn_X = trn_X.astype('float32')
    tst_X = tst_X.astype('float32')

    trn_y = trn_y.astype('float32')
    tst_y = tst_y.astype('float32')

    # # # trn_X.info(memory_usage='deep')
    # print("train_Y")

    for col in range(len(trn_y[0])):
        train_set = lgbm.Dataset(trn_X, trn_y[:,col])
        valid_set = lgbm.Dataset(tst_X, tst_y[:,col])
    #for col in trn_y.columns:
        #train_set = lgbm.Dataset(trn_X, trn_y[col])
        #print(trn_X.shape[0])
        #print(trn_y[col].shape[-1])
        # print(trn_y[col].nunique())
        #valid_set = lgbm.Dataset(tst_X, tst_y[col])
    #     print(tst_X)
    #     print(tst_y[col])

        model = lgbm.train(lgb_param, train_set=train_set, valid_sets=valid_set,
                            num_boost_round = 1000, verbose_eval=10)
        models[0] = model
        print('tst_X: ', tst_X)
        current_directory = os.getcwd()
        save_path = '/home/auros/gits/programming/python3_10/projects/ML/hybrid/thicknessDynamicPrecision/trained_model1.txt'
        model.save_model(save_path)

        pred = model.predict(tst_X)
        # print('tst_y: ',tst_y)
        # print('pred_len: ', len(pred))
        # print('pred: ', pred)
        # # print('tst_y: ',np.transpose(tst_y)[0])
        # print('predM: ', pred / np.transpose(tst_y)[0] * 100)

        refpred = insert_col_left(np.transpose([pred]), np.transpose(tst_y)[0])
        refpred = insert_col_left(refpred, pred / np.transpose(tst_y)[0] * 100)
        print('refpred: ', refpred)

    return jsonify({ 'data1':data1_mod2.tolist(), 'header1':header1_mod1.tolist(), 'refpred': refpred.tolist(), 'tst_X': tst_X.tolist() })


@app.route('/DynamicPrec_predict', methods=['POST'])
def DynamicPrec_predict_numbers():
    tr_json = request.get_json()
    data2 = tr_json['data2']
    header2 = tr_json['header2']
    data2Arr = np.array(data2).astype(str)
    header2Arr = np.array(header2).astype(str)
    print('empty or null cell indices(if it represent [] then fine!!):' ,find_empty_indices(data2Arr))

    data2_mod1 = data2Arr.astype(float)
    model = models[0]
    pred = model.predict(data2_mod1)

    refpred = insert_col_left(np.transpose([pred]), np.zeros(len(pred)))
    refpred = insert_col_left(refpred, np.zeros(len(pred)))

    return jsonify({ 'refpred': refpred.tolist(),  })
#################################################### functions general ####################################################
def find_empty_indices(array_of_arrays):
    empty_cells = (array_of_arrays == "") | (array_of_arrays == None)
    row_indices, col_indices = np.where(empty_cells)
    return list(zip(row_indices, col_indices))

def insert_col_left(arr, inserts, axis=1):
    modified_arr = np.insert(arr, 0, inserts, axis)
    return modified_arr

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

############################################### host set #######################################################
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7001)
#
#
#https://tms-dev-blog.com/python-backend-with-javascript-frontend-how-to/
#출처: https://lifelong-education-dr-kim.tistory.com/entry/Python-numpy-FFT-IFFT-사용하기-주기분석 [독학하는 김박사:티스토리]
