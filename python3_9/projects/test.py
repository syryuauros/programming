#!./result/bin/python3

import numpy as np
a = 2;
print(a)
list1 = [1, 2, 3, 4]
a = np.array(list1)
print(a.shape) # (4, )
#

#b = np.array([1, 2, 3])
b = np.array([[1, 2, 3],[4, 5, 6]])
print(b.shape) # (2, 3)
print(b[0, 0])  #1
