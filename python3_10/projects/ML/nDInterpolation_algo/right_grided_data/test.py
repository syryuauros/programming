#!/usr/bin/env python3
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import flask
import json
import numpy as np
import copy
import math
from scipy.interpolate import griddata

def is_point_inside_territory(dataMatrix, targetVector):
    A = np.transpose(np.copy(dataMatrix)).tolist()
    det_A = np.linalg.det(A)
    sign_det_A = det_A/abs(det_A)
    # print('det_A: ', det_A)
    det_A1 = np.zeros(len(A))
    for i in np.arange(0,len(A),1):
        A1 = copy.deepcopy(A)
        A1[i] = targetVector.tolist()
        # print('A1: ', A1)
        det_A1[i] = sign_det_A * np.linalg.det(A1)
        # print('det_A1: ', det_A1)

    if any(x <= 0 for x in det_A1) or any(math.isnan(x) for x in det_A1):
        return False
    elif np.isclose(abs(det_A),sum(det_A1)):
        return True
    else:
        return False

def nDIntp(inputData, values, targetData):
    inputs = np.transpose(np.copy(inputData))
    listOfPoints = inputs.tolist()
    dataMatrix = np.vstack((np.copy(inputs), np.ones(len(listOfPoints[0]))))
    results = np.zeros(len(targetData))

    for i in np.arange(0,len(targetData),1):
        targetDataTemp = targetData[i]
        targetVectorTemp = np.insert(targetDataTemp, len(targetDataTemp), 1)

        lambdaMatrixTemp = np.linalg.inv(dataMatrix) @ targetVectorTemp
        resultTemp = lambdaMatrixTemp @ values
        is_point_inside = is_point_inside_territory(dataMatrix, targetVectorTemp)
        if is_point_inside:
            results[i] = resultTemp
        else:
            results[i] = float('nan')

    return results


    # if is_point_inside:
    #     return [results]
    # else:
    #     return [ float('nan') ]





# listOfPoints = [[0,3]]
# values = np.array([0,7])
# targetData = np.array([[0.2]]) #True

listOfPoints = [[0,3,0], [0,0,4]]
values = np.array([0,3,3])
targetData = np.array([[0.4,1.1]]) #True
targetData = np.array([[0.4, 1.1], [0.5, 0.5],[4,5]])

# listOfPoints = [[0,3,0], [0,0,4]]
# values = np.array([0,3,3])
# targetData = np.array([[4,5]]) #False

# listOfPoints = [[0,1,0,0.5], [0,0,1,0.5], [0,0,0,1]]
# values = np.array([0,3,7,9])
# targetData = np.array([[0.45,0.5,0.7]]) #True

# listOfPoints = [[0,1,0,0.5], [0,0,1,0.5], [0,0,0,1]]
# values = np.array([0,3,7,9])
# targetData = np.array([[45,5,7]]) #False

# listOfPoints = [[0,1,0,0.5,0], [0,0,1,0.5,0], [0,0,0,1,0], [0,0,0,0,20]]
# values = np.array([0,3,7,9,11])
# targetData = np.array([[0.45,0.5,0.7,0.7]]) #True

# listOfPoints = [[0.5,1,0,0,0], [0,0,1,0,6], [0,0,0,1,0], [0,0,0,7,8]]
# values = np.array([10,20,30,40,50])
# targetData = np.array([[1.45,1.5,1.7,1.5]]) #False

inputs = np.array(listOfPoints)

inputData = np.transpose(np.copy(inputs))
# dataMatrix = np.vstack((np.copy(inputs),np.ones(len(listOfPoints[0]))))
# targetVector = np.insert(targetData, len(targetData),1)

# print(' inputData:\n ', inputData)
# print('\n dataMatrix\n ', dataMatrix)
# print('\n targetVector: ', targetVector)


# lamdaMatrix = np.linalg.inv(dataMatrix) @ targetVector
# print('\n lambdaMatrix: ', lamdaMatrix)
# results2D = lamdaMatrix @ values
# print('\n results: ', results2D)

nDIntpResults = nDIntp(inputData, values, targetData)
print('nDIntpResults: ', nDIntpResults)

grid_values = griddata(inputData, values, targetData, method='linear')
print(' grid_values: ', grid_values)

# is_point_inside = is_point_inside_territory(dataMatrix, targetVector)
# print('is point inside?: ', is_point_inside)




# app = Flask(__name__)
# CORS(app)

# @app.route('/nD_interpolation', methods=['POST'])
# def nD_interpolation_numbers():
#     tr_json = request.get_json()
#     xData = tr_json['xData']
#     inputData = tr_json['inputData']
#     paramData = tr_json['paramData']
#     pointsData = tr_json['pointsData']
#     paramHead = tr_json['paramHead']

#     xDataArr = np.array(xData).astype(float)
#     inputDataArr = np.array(inputData).astype(float)
#     paramDataArr = np.array(paramData).astype(float)
#     pointsDataArr = np.array(pointsData).astype(float)
#     paramHeadArr = np.array(paramHead).astype(str)

#     # inputDataArrTr = np.transpose(inputDataArr)
#     paramDataArrTr = np.transpose(paramDataArr)
#     # pointsDataArrTr = np.transpose(pointsDataArr)

#     # print(inputDataArrTr)
#     # print(inputDataArrTr[0])
#     # print(paramDataArrTr)
#     # print(pointsDataArrTr)
#     # print(paramHeadArr)

#     # points = np.random.rand(10, 2)
#     # values = np.random.rand(10)
#     # grid_x, grid_y = np.mgrid[0:1:11j, 0:1:5j]
#     # grid_values = griddata(points, values, (grid_x, grid_y), method='linear')
#     # grid_values1 = griddata(points, values, ([0.3, 0.5], [0.25, 0.5]), method='linear')
#     # print(points)
#     # print(values)
#     # print(grid_x)
#     # print(grid_y)
#     # print(grid_values)
#     # print(grid_values1)

#     points = paramDataArrTr
#     out_points = pointsDataArr

#     num_inputData = inputDataArr.shape[0]
#     num_out_points = len(out_points[0])
#     results = np.zeros((num_inputData,num_out_points))
#     for i in range(num_inputData):
#         values = inputDataArr[i]

#         # grids_min = np.amin(paramDataArr, axis=1)
#         # grids_max = np.amax(paramDataArr, axis=1)
#         # intervals = np.array([2, 2])

#         # grids = {}
#         # grids[0], grids[1] = np.mgrid[
#         #     grids_min[0]:grids_max[0]:intervals[0],
#         #     grids_min[1]:grids_max[1]:intervals[1]
#         # ]  #2:10:2 = [2,4,6,8,10] * 2~10, interval2,  2:10:5j = [2,4,6,8,10] * 2~10, 5points
#         # grid_values = griddata(points, values, (grids[0], grids[1]), method='linear')

#         #grid_values1 = griddata(points, values, ([20, 20], [25, 35]), method='linear')

#         grid_values = griddata(points, values, (out_points[0], out_points[1]), method='linear')
#         results[i] = grid_values


#     results = insert_col_left(results,np.transpose(xDataArr))
#     # print(points)
#     # print(values)
#     # print(grids[0])
#     #print(grid_x)
#     # print(grid_values)
#     # print(grid_values1)

#     # print(grids_min)
#     # print(grids_max)
#     # print(out_points[0])
#     # print(out_points[1])
#     # print(results.tolist())
#     # print(num_inputData)

#     return jsonify({ 'results': results.tolist(), })


# def insert_col_left(arr, inserts, axis=1):
#     modified_arr = np.insert(arr, 0, inserts, axis)
#     return modified_arr


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=7003)
