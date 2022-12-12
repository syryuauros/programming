# -*- coding: utf-8 -*-
"""
Created on Wed Jul 20 15:56:52 2022

@author: td.kang
"""
# 2022.08.09 test_X is moved to the end of the codes

import pandas as pd

#import seaborn as sns
import matplotlib.pyplot as pyplot
from tqdm import tqdm

from sklearn.model_selection import train_test_split
import lightgbm as lgbm  # light gradient boosting machine

import sys
result_path=sys.argv[1]+'/Result/'
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

    from numpy.lib.type_check import real
    import numpy as np
    feature_col = list(train_X)
    print("-------------------")
    print(feature_col)
    alpha_real = train_X[feature_col]
    #alpha_real = train_X[feature_col]
    #print("alpha_real")
    #print(alpha_real)

    alpha_imag = train_X[feature_col]
    #alpha_imag = train_X[feature_col]

    #alpha_real=alpha_real1.convert_objects(convert_numeric=True)
    #alpha_imag=alpha_imag1.convert_objects(convert_numeric=True)


    #print(alpha_imag)
    #print("alpha real index")
    #print(alpha_real.index)

    for i in tqdm(alpha_real.index):

      alpha_real.loc[i]=alpha_real.loc[i].astype("float")
      alpha_imag.loc[i]=alpha_imag.loc[i].astype("float")

      alpha_real.loc[i] = alpha_real.loc[i] - alpha_real.loc[i].mean()
      alpha_imag.loc[i] = alpha_imag.loc[i] - alpha_imag.loc[i].mean()

      alpha_real.loc[i] = np.fft.fft(alpha_real.loc[i], norm="ortho").real
      alpha_imag.loc[i] = np.fft.fft(alpha_imag.loc[i], norm="ortho").imag

    real_part = []
    imag_part = []

    for col in feature_col:
      real_part.append(col + '_fft_real');
      print(col + ":")
      imag_part.append(col + '_fft_imag');

    alpha_real.columns = real_part
    alpha_imag.columns = imag_part
    alpha = pd.concat((alpha_real, alpha_imag), axis=1)  # prepared train_data

    train_X = pd.concat((train_X, alpha), axis=1)

    #%% ---- Model Training


    import pickle

    # alpha.to_pickle('DFT.pickle')
    pickle.dump(alpha, open('DFT.pkl', 'wb'))

    trn_X, tst_X, trn_y, tst_y = train_test_split(train_X, train_Y, test_size=0.05, shuffle=True)
    #print(train_X)
    #print(trn_X)
    train_set = lgbm.Dataset(trn_X, trn_y)

    valid_set = lgbm.Dataset(tst_X, tst_y)

    lgb_param = {'objective': 'regression',
                'n_estimators': 100,
                'drop_rate': 0.8,
                'skip_drop': 0.8,
                'learning_rate' : 0.5,
                'max_depth' : 6,
                'random_state' : 42,
                'metric' : 'l1',   # L1=abs(Y-f(x)), L1 means how different the two values are
                'colsample_bytree' : 0.7,
                'subsample' : 0.7,
                'num_leaves' : 6,
                }

    trn_X = trn_X.astype('float32')
    tst_X = tst_X.astype('float32')


    trn_X.info(memory_usage='deep')
    models = {}
    print("train_Y")
    #print(trn_y.columns)

    for col in trn_y.columns:
        train_set = lgbm.Dataset(trn_X, trn_y[col])
        valid_set = lgbm.Dataset(tst_X, tst_y[col])
        model = lgbm.train(lgb_param, train_set=train_set, valid_sets=valid_set,
                            num_boost_round = 1000, verbose_eval=10)
        models[col] = model
        print(col)

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


        print(test_X)

        feature_col = list(test_X)

        alpha_real = test_X[feature_col]
        alpha_imag = test_X[feature_col]

        for i in tqdm(alpha_real.index):
            alpha_real.loc[i]=alpha_real.loc[i].astype("float")
            alpha_imag.loc[i]=alpha_imag.loc[i].astype("float")

            alpha_real.loc[i]=alpha_real.loc[i] - alpha_real.loc[i].mean()
            alpha_imag.loc[i]=alpha_imag.loc[i] - alpha_real.loc[i].mean()

            alpha_real.loc[i] = np.fft.fft(alpha_real.loc[i], norm='ortho').real
            alpha_imag.loc[i] = np.fft.fft(alpha_imag.loc[i], norm='ortho').imag


        real_part=[]
        imag_part=[]

        for col in feature_col:
            real_part.append(col + '_fft_real')
            imag_part.append(col + '_fft_imag')

        alpha_real.columns = real_part
        alpha_imag.columns = imag_part
        alpha_test = pd.concat((alpha_real, alpha_imag), axis=1)  # prepared test_data

        test_X = pd.concat((test_X, alpha_test), axis=1)


        # --------------- Test data ------------------------------------------------------

        #%
        # ------------  LGBM config ----------------------------


        sample_sub = pd.read_csv(sample_form_path+'sample_submission - 2000 test.csv', index_col=0)
        sample_sub


        for col in train_Y.columns:


            Result_filename=train_dataname+"_"+test_dataname+"_"+str(col)

        #for col in train_Y.columns:
            pred = models[col].predict(test_X)
            #sample_sub[col] = pred
            sample_sub['ref'] = np.array(test_X_val[col])
            sample_sub['pred'] = pred

            sample_sub.to_csv(result_path+Result_filename+'.csv') # 33.9점






#from scipy.stats import kurtosis, iqr

#def rms(x):
#    return np.sqrt(np.mean(x**2))

#def rss(x):
#    return rms(x)*len(x)




        #%% 왜도

# def skewness(x):
#     return (sum((x-np.mean(x))**3)/len(x))/(sum((x-np.mean(x))**2)/len(x))**(3/2)

# function_list = ['mean', 'min', 'max', 'std', skewness, rss]
# train_X2 = train_X.aggregate(function_list,axis=1)
# test_X2 = test_X.aggregate(function_list,axis=1)

# import pickle

# alpha = pickle.load(open('DFT.pkl','rb'))

# from sklearn.model_selection import train_test_split

# trn_X, tst_X, trn_y, tst_y = train_test_split(train_X2, train_Y, test_size=0.05, shuffle=True)  #shuffling the order of data for train&test

# models = {}

# for col in trn_y.columns:
#     train_set = lgbm.Dataset(trn_X, trn_y[col])
#     valid_set = lgbm.Dataset(tst_X, tst_y[col])
#     model = lgbm.train(lgb_param, train_set=train_set, valid_sets=valid_set,
#                         num_boost_round = 1000, verbose_eval=10)

#     Result_filename=train_dataname+"_"+test_dataname+"_"+str(col)

# #for col in train_Y.columns:
#     pred = models[col].predict(test_X2)
#     #sample_sub[col] = pred
#     sample_sub[1] = test_X_val[col]
#     sample_sub[2] = pred


#     sample_sub.to_csv(result_path+Result_filename+'_skew'+'.csv')




#%%
# Calculation Correlations between reference and predicted

for i in range(0,len(train_name_list)):


    train_dataname=train_name_list[i]

    for j in range(0,len(test_name_list)):

        test_dataname=test_name_list[j]



        correlation=pd.DataFrame(columns=['Layer','R'])
        import scipy.stats
        m=-1

        for col in train_Y.columns:
            m=m+1
            train_test_name=train_dataname+"_"+test_dataname
            Result_filename=train_test_name+"_"+str(col)
            loaded_result=pd.read_csv(result_path+Result_filename+'.csv')

            slope, intercept, rvalue_x, _, _ = scipy.stats.linregress(loaded_result['pred'], loaded_result['ref'])
            print(Result_filename)
            correlation=correlation.append({'Layer': loaded_result['pred'][m],'R': rvalue_x},ignore_index=True)



        correlation.to_csv(result_path+train_test_name+"_correlations"+'.csv')
        del correlation


#%%  Correlation tables for correlation averaged for all parameters

import numpy as np

correlation_table=pd.DataFrame(columns=['Train_Data(row)'])
correlation_per_index=pd.DataFrame(columns=['Layer Index','Train_Data(row)'])
correlation_array=[[0 for col in range(len(test_name_list))] for row in range(len(train_name_list))]


column_head=[]
index_value=[]

for j in range(0,len(test_name_list)):

    test_dataname=test_name_list[j]+"_Test"
    column_head.append(test_dataname)
for i in range(0,len(train_name_list)):

    train_dataname=train_name_list[i]
    index_value.append(train_dataname)

for i in range(0,len(train_name_list)):


    train_dataname=train_name_list[i]
    #correlation_line=correlation_line.append(train_dataname)

    for j in range(0,len(test_name_list)):

        file_name_txt=str(file_index[j])
        test_dataname=test_name_list[j]


        Result_filename=train_dataname+"_"+test_dataname
        loaded_corr_result=pd.read_csv(result_path+Result_filename+"_correlations"+'.csv')
        corr_mean=loaded_corr_result['R'].mean()
        correlation_array[i][j]=corr_mean



        #for k in loaded_corr_result.index:
        #correlation_per_index=correlation_per_index.append({'Layer Index':k, 'Train_Data(row)':train_dataname, test_dataname:loaded_corr_result['R^2']},ignore_index=True)

correlation_table=pd.DataFrame(correlation_array, index=index_value, columns=column_head)

correlation_table.to_csv(result_path+"correlation_table_for_mean"+'.csv')

#%%  Correlation tables for each individual parameters

k=-1
for col in train_Y.columns:
    k=k+1
    for i in range(0,len(train_name_list)):


        train_dataname=train_name_list[i]
        #correlation_line=correlation_line.append(train_dataname)

        for j in range(0,len(test_name_list)):


            test_dataname=test_name_list[j]


            Result_filename=train_dataname+"_"+test_dataname
            loaded_corr_result=pd.read_csv(result_path+Result_filename+"_correlations"+'.csv')
            t_val=loaded_corr_result['R'][k]
            correlation_array[i][j]=t_val



    correlation_table=pd.DataFrame(correlation_array, index=index_value, columns=column_head)
    correlation_table.to_csv(result_path+"correlation_table_for_"+str(col)+'.csv')
