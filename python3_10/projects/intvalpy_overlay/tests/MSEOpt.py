#!/usr/bin/env python3

import intvalpy as ip
import numpy as np
# transition from extend precision (type mpf) to double precision (type float)
# ip.precision.extendedPrecisionQ = False
#
wl = np.array(list(range(200,801,5)))
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
