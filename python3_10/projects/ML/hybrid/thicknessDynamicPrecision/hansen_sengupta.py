#!/usr/bin/env python3

import numpy as np
import numpy.interval as npiv
import time

def my_function(x):
    return x**3 - 2*x**2 + x - 1

intervals = [npiv.interval([-10, 10]), npiv.interval([-100, 100]), npiv.interval([-1000, 1000])]

for interval in intervals:
    start_time = time.time()
    range_enclosure = npiv.hansen_sen(my_function, interval)
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Input intervals: {interval}")
    print(f"Range enclosure: {range_enclosure}")
    print(f"Execution time: {execution_time:.6f} seconds\n")
