#!/usr/bin/env python3

import intvalpy as ip
# transition from extend precision (type mpf) to double precision (type float)
# ip.precision.extendedPrecisionQ = False

A = ip.Interval([
  [[2, 4], [-2, 1]],
  [[-1, 2], [2, 4]]
])
b = ip.Interval([[-2, 2], [-2, 2]])

tol = ip.linear.Tol.maximize(
    A = A,
    b = b,
    x0 = None,
    weight = None,
    linear_constraint = None
)
print(tol)
