#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
import flask
import json
import numpy as np
from scipy.interpolate import griddata

from test import is_point_inside_territory, nDIntp

app = Flask(__name__)
CORS(app)

@app.route('/nD_interpolation', methods=['POST'])
def nD_interpolation_numbers():
    tr_json = request.get_json()
    xData = tr_json['xData']
    inputData = tr_json['inputData']
    paramData = tr_json['paramData']
    pointsData = tr_json['pointsData']
    paramHead = tr_json['paramHead']

    xDataArr = np.array(xData).astype(float)
    inputDataArr = np.array(inputData).astype(float)
    paramDataArr = np.array(paramData).astype(float)
    pointsDataArr = np.array(pointsData).astype(float)
    paramHeadArr = np.array(paramHead).astype(str)

    # inputDataArrTr = np.transpose(inputDataArr)
    paramDataArrTr = np.transpose(paramDataArr)
    # pointsDataArrTr = np.transpose(pointsDataArr)

    # print(inputDataArrTr)
    # print(inputDataArrTr[0])
    # print(paramDataArrTr)
    # print(pointsDataArrTr)
    # print(paramHeadArr)

    # points = np.random.rand(10, 2)
    # values = np.random.rand(10)
    # grid_x, grid_y = np.mgrid[0:1:11j, 0:1:5j]
    # grid_values = griddata(points, values, (grid_x, grid_y), method='linear')
    # grid_values1 = griddata(points, values, ([0.3, 0.5], [0.25, 0.5]), method='linear')
    # print(points)
    # print(values)
    # print(grid_x)
    # print(grid_y)
    # print(grid_values)
    # print(grid_values1)

    points = paramDataArrTr
    out_points = pointsDataArr


    num_inputData = inputDataArr.shape[0]
    num_out_points = len(out_points[0])
    results = np.zeros((num_inputData,num_out_points))
    for i in range(num_inputData):
        values = inputDataArr[i]

        # grids_min = np.amin(paramDataArr, axis=1)
        # grids_max = np.amax(paramDataArr, axis=1)
        # intervals = np.array([2, 2])

        # grids = {}
        # grids[0], grids[1] = np.mgrid[
        #     grids_min[0]:grids_max[0]:intervals[0],
        #     grids_min[1]:grids_max[1]:intervals[1]
        # ]  #2:10:2 = [2,4,6,8,10] * 2~10, interval2,  2:10:5j = [2,4,6,8,10] * 2~10, 5points
        # grid_values = griddata(points, values, (grids[0], grids[1]), method='linear')

        #grid_values1 = griddata(points, values, ([20, 20], [25, 35]), method='linear')

        grid_values = nDIntp(points, values, np.transpose(out_points))
        # grid_values = griddata(points, values, np.transpose(out_points), method='linear')
        #grid_values = griddata(points, values, (out_points[0], out_points[1]), method='linear')
        results[i] = grid_values


    results = insert_col_left(results,np.transpose(xDataArr))
    # print(points)
    # print(values)
    # print(grids[0])
    #print(grid_x)
    # print(grid_values)
    # print(grid_values1)

    # print(grids_min)
    # print(grids_max)
    # print(out_points[0])
    # print(out_points[1])
    # print(results.tolist())
    # print(num_inputData)

    return jsonify({ 'results': results.tolist(), })


def insert_col_left(arr, inserts, axis=1):
    modified_arr = np.insert(arr, 0, inserts, axis)
    return modified_arr

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7003)
