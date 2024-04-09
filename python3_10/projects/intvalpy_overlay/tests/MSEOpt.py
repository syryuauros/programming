#!/usr/bin/env python3

import intvalpy as ip
import numpy as np
# transition from extend precision (type mpf) to double precision (type float)
# ip.precision.extendedPrecisionQ = False
#
wl = np.array(list(range(10,21)))
rand = np.random.rand(len(wl))
print(wl)
md = 4 * wl ** 2 + 3 * wl + 1 + rand * 0.01
print(md)

def mse(a):
    t1 = a[0] * wl ** 2 + a[1] * wl + 1
    residue = (t1 - md) ** 2
    residue_sum = 0
    for i in residue:
        residue_sum += i
    return residue_sum

a = ip.Interval([-2, -1], [5, 5])

print(mse([4,3]))
results = ip.nonlinear.globopt(mse, a, tol=1e-14)
print(results)

# def levy(x):
#     z = 1 + (x - 1) / 4
#     t1 = np.sin( np.pi * z[0] )**2
#     t2 = sum(((x - 1) ** 2 * (1 + 10 * np.sin(np.pi * x + 1) ** 2))[:-1])
#     t3 = (z[-1] - 1) ** 2 * (1 + np.sin(2*np.pi * z[-1]) ** 2)
#     return t1 + t2 + t3
# def levy2(x):
#     z = (x-2) ** 2 + 1
#     t1 = (x[0]-2) ** 2 + 2
#     t2 = x[1] + 3
#     return t1 + t2

# N = 2
# x = ip.Interval([-5]*N, [5]*N)
# testx = ip.Interval([-5]*3, [5]*3)
# results = ip.nonlinear.globopt(levy2, x, tol=1e-14)
# print(testx)
# print(results)
