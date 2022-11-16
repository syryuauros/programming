#!./result-1/bin/python3

import numpy as np
import sympy as sym
from sympy import *

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

x = sym.symbols('x')
y = sym.symbols('y', cls=Function)

x_sol_eq = Eq(2*x-y(x).diff(x).diff(x),0)
sol = dsolve(x_sol_eq, y(x))
print(sol)
