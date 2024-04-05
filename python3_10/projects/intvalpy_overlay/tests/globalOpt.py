#!/usr/bin/env python3

import intvalpy as ip
import numpy as np
# transition from extend precision (type mpf) to double precision (type float)
# ip.precision.extendedPrecisionQ = False

def levy(x):
    z = 1 + (x - 1) / 4
    t1 = np.sin( np.pi * z[0] )**2
    t2 = sum(((x - 1) ** 2 * (1 + 10 * np.sin(np.pi * x + 1) ** 2))[:-1])
    t3 = (z[-1] - 1) ** 2 * (1 + np.sin(2*np.pi * z[-1]) ** 2)
    return t1 + t2 + t3

N = 2
x = ip.Interval([-5]*N, [5]*N)
results = ip.nonlinear.globopt(levy, x, tol=1e-14)
print(results)
