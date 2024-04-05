#!/usr/bin/env python3

import intvalpy as ip
ip.precision.extendedPrecisionQ = False
import numpy as np
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 3, 5, 7, 11]

# Step 3: Plot the Data
# plt.plot(x, y)

# # Step 4: Customize the Plot (Optional)
# plt.xlabel('X-axis Label')
# plt.ylabel('Y-axis Label')
# plt.title('Simple Line Plot')

# Step 5: Show or Save the Plot
# plt.show()

x = ip.Interval(np.array([1.06978355, 1.94152571, 1.70930717, 2.94775725, 4.55556349, 6, 6.34679035, 6.62305275]), \
                np.array([1.1746937 , 2.73256075, 1.95913956, 3.61482169, 5.40818299, 6, 7.06625362, 7.54738552]))
y = ip.Interval(np.array([0.3715678 , 0.37954135, 0.38124681, 0.39739009, 0.42010472, 0.45, 0.44676075, 0.44823645]), \
                np.array([0.3756708 , 0.4099036 , 0.3909104 , 0.42261893, 0.45150898, 0.45, 0.47255936, 0.48118948]))
iplt = ip.IPlot(figsize=(15, 15))
fig, ax = iplt.subplots(nrows=2, ncols=2)

axindex = (0, 0)
iplt.scatter(x, y, color='gray', alpha=0.7, s=10, axindex=axindex)
iplt.fig.savefig('/home/auros/gits/programming/python3_10/projects/intvalpy_overlay/plotTest.png', format='png')
#iplt.fig.savefig('./plotTest.png', format='png')
