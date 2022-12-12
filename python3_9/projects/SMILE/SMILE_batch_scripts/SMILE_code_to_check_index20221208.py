# -*- coding: utf-8 -*-
"""
Created on Wed Jul 20 15:56:52 2022

@author: td.kang
"""
# 2022.08.09 test_X is moved to the end of the codes

import pandas as pd
import sys

#import seaborn as sns
import matplotlib.pyplot as pyplot
from tqdm import tqdm

from sklearn.model_selection import train_test_split
import lightgbm as lgbm  # light gradient boosting machine


result_path=sys.argv[1]+'/Result'
data_path=sys.argv[1]
sample_form_path=data_path
sample_form_file='sample_submission - 2000 test.csv'

print(result_path)
print(data_path)
print(sys.argv[2].split('/'))

filename_pre="train"
file_index=list(map(float, sys.argv[2].split('/')))
#file_index=[0.000,0.002,0.004,0.008,0.010]
print(file_index)
max_data_index=1
file_index_format="{:.3f}"
str0="_"
train_X_i=606
train_Y_i=0
train_Y_f=606
train_rows=8000

test_file_index="1.csv"
test_rows_i=3000
test_rows_f=5000


#%% defining filenames
train_name_list=[]
test_name_list=[]




for i in range(0,len(file_index)):
    file_name_txt=file_index_format.format(file_index[i])
    train_dataname=filename_pre+file_name_txt.replace('.','_')

    train_name_list.append(train_dataname)

for j in range(0,len(file_index)):
    file_name_txt=file_index_format.format(file_index[j])
    test_dataname=filename_pre+file_name_txt.replace('.','_')

    test_name_list.append(test_dataname)

 # additional suffix


#%% for checking the data and headers




train_dataname=train_name_list[i]
train_X=pd.DataFrame()
train = pd.read_csv(data_path+train_dataname + str0+"0.csv")
train=train.set_index('Index')

train_X=train.iloc[:,train_X_i:]
train_Y=train.iloc[:,train_Y_i:train_Y_f]

#%%
for i in range(0,len(train_name_list)): # 0,1,...,11, 12


    #train_dataname="train0_0"+str(i)

    train_dataname=train_name_list[i]


    train_X=pd.DataFrame()
    train = pd.read_csv(data_path+train_dataname +str0+ "0.csv")
    train=train.set_index('Index')

    for k in range(1,max_data_index+1):  # 1
         #stop
         #filename="train0_01_ "+str(k)+".csv"
         filename=train_dataname + str0 +str(k)+".csv"

         train_t=pd.read_csv(data_path+filename)
         train_t=train_t.set_index('Index')
         train = pd.concat([train,train_t])

    #     train_X = pd.concat([train_X , train.iloc[:,202:]],axis=0)
    #     train_Y = pd.concat([train_Y , train.iloc[:,1:2]],axis=0)
    #stop

    train_X=train.iloc[:train_rows,train_X_i:]
    #train_Y=train.iloc[:,2:train_Y_f]
    train_Y=train.iloc[:train_rows,train_Y_i:train_Y_f]


    #train_X=train_X1.convert_objects(convert_numeric=True)
    #print(train_X)

    print("-------------------")
    feature_Col_X=list(train_X)
    feature_Col_Y=list(train_Y)
    #print(feature_Col_X)
    #print(feature_Col_Y)
    print(train_dataname)
    print('trainX_i =' + str(feature_Col_X[0]))
    print('trainY_i =' + str(feature_Col_Y[0]))
    print('trainY_f =' + str(feature_Col_Y[train_Y_f-train_Y_i-1]))



    #%% --------------- Test data ------------------------------------------------------

    import numpy as np
    from tqdm import tqdm





    for j in range(0,len(test_name_list)):

        #%
        print(j)

        test_dataname=test_name_list[j]

        test = pd.read_csv(data_path+test_dataname+ str0 +test_file_index)
        #test = pd.read_csv("D:\\Machine Learning\\SMILE\\100 rep\\Data from H\\test 20220808 with top float\\thickness uncertainty 0.03\\for test.csv")
        test=test.set_index('Index')

        test_X = test.iloc[test_rows_i:test_rows_f,train_X_i:]
        test_X_val=test.iloc[test_rows_i:test_rows_f,train_Y_i:train_Y_f]





        print("-------------------")
        feature_Col_X=list(test_X)

        #print(feature_Col_X)

        print(test_dataname)
        #print(test_dataname+ str0 +test_file_index)
        print('testX_i =' + str(feature_Col_X[0]))





        # --------------- Test data ------------------------------------------------------

        #%
        # ------------  LGBM config ----------------------------


        sample_sub = pd.read_csv(sample_form_path+sample_form_file, index_col=0)
        sample_sub


        for col in train_Y.columns:


            Result_filename=train_dataname+"_"+test_dataname+"_"+str(col)

        #for col in train_Y.columns:
