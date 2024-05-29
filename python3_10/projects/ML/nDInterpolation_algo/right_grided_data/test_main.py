#!/usr/bin/env python3
import json
import numpy as np
import copy
import math
from scipy.interpolate import griddata

from test import is_point_inside_territory, nDIntp

# listOfPoints = [[0,3]]
# values = np.array([0,7])
# targetData = np.array([[0.2]]) #True

listOfPoints = [[0,3,0,1], [0,0,4,1]]
values = np.array([0,3,3,5])
targetData = np.array([[1.1,0.4]]) #True
targetData = np.array([[0.4, 1.1], [0.5, 0.5],[4,5],[1.1,0.4]])

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
# distances = np.linalg.norm(np.transpose(inputs) - targetData[0], axis=1)
# sorted_indices = np.argsort(distances)

inputData = np.transpose(np.copy(inputs))
print('inputData: \n', inputData)

nDIntpResults = nDIntp(inputData, values, targetData)
print('nDIntpResults: ', nDIntpResults)

grid_values = griddata(inputData, values, targetData, method='linear')
print(' grid_values: ', grid_values)
