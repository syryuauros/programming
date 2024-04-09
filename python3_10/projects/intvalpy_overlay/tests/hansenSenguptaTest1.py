#!/usr/bin/env python3

import intvalpy as ip
# transition from extend precision (type mpf) to double precision (type float)
# ip.precision.extendedPrecisionQ = False

epsilon = 0.1
def f(x):
    return ip.asinterval([x[0]**2 + x[1]**2 - 1 - ip.Interval(-epsilon, epsilon),
                          x[0] - x[1]**2])

def J(x):
    result = [[2*x[0], 2*x[1]],
              [1, -2*x[1]]]
    return ip.asinterval(result)

results = ip.nonlinear.HansenSengupta(f, J, ip.Interval([0.5,0.5],[1,1]))
print(f([0.5, 0.5]))
print(f([1, 1]))
print(results)
