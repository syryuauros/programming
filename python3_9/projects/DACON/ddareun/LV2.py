#!./result-1/bin/python3


import pandas as pd
import sklearn
# from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestRegressor

train = pd.read_csv('./projects/DACON/ddareun/train.csv')
test = pd.read_csv('./projects/DACON/ddareun/test.csv')
print(train.isnull().sum())


#test_fn = test.fillna(0)

#train_dn = train.dropna()
test_dn = test.dropna()
#
#interpolation(보간법)으로 결측치 보정
train.interpolate(inplace=True)
test.fillna(0, inplace=True)


#평균으로 결측치 보정
# train.fillna({'hour_bef_temperature':int(train['hour_bef_temperature'].mean())}, inplace=True)
# train.fillna({'hour_bef_precipitation':int(train['hour_bef_precipitation'].mean())}, inplace=True)
# train.fillna({'hour_bef_windspeed':int(train['hour_bef_windspeed'].mean())}, inplace=True)
# train.fillna({'hour_bef_humidity':int(train['hour_bef_humidity'].mean())}, inplace=True)
# train.fillna({'hour_bef_visibility':int(train['hour_bef_visibility'].mean())}, inplace=True)
# train.fillna({'hour_bef_ozone':int(train['hour_bef_ozone'].mean())}, inplace=True)
# train.fillna({'hour_bef_pm10':int(train['hour_bef_pm10'].mean())}, inplace=True)
# train.fillna({'hour_bef_pm2.5':int(train['hour_bef_pm2.5'].mean())}, inplace=True)

print(train.isnull().sum())

X_train = train.drop(['count'], axis=1)
Y_train = train['count']
#Y_test = test_dn['count']


#print(test.shape)
#print(test.head())
#print(test_dn.info())
#print(test.isnull())
#
# model = DecisionTreeClassifier()
# model = RandomForestRegressor(criterion='mse') #option 'mse' is changed to 'squared_error' after v1.2
model = RandomForestRegressor(criterion='squared_error')
model.fit(X_train,Y_train)

#print(train.iloc[0])
#print(train.head)
# print(model.feature_importances_)  #randomforest모델의 예측변수의 중요도 출력!
#print(pd.Series(data = model.feature_importances_, index = X_train.iloc[0].index))  #randomforest모델의 예측변수의 중요도 출력!
#print(train_dn)
#print(X_train)
#print(Y_train)

###################################################################################################

print(pd.Series(data = model.feature_importances_, index = X_train.iloc[0].index))  #randomforest모델의 예측변수의 중요도 출력!
X_train_1 = train.drop(['count','id'], axis=1)
X_train_2 = train.drop(['count', 'id', 'hour_bef_windspeed'], axis=1)
X_train_3 = train.drop(['count', 'id', 'hour_bef_windspeed', 'hour_bef_pm2.5'], axis=1)

# 각 train 에 따라 동일하게 피쳐를 drop 한 test 셋들을 생성하세요.

test_1 = test.drop(['id'], axis=1)
test_2 = test.drop(['id', 'hour_bef_windspeed'], axis=1)
test_3 = test.drop(['id', 'hour_bef_windspeed', 'hour_bef_pm2.5'], axis=1)

# 각 X_train에 대해 모델 훈련을 해주세요.

model_input_var1 = RandomForestRegressor(criterion = 'squared_error')
model_input_var1.fit(X_train_1, Y_train)

model_input_var2 = RandomForestRegressor(criterion = 'squared_error')
model_input_var2.fit(X_train_2, Y_train)

model_input_var3 = RandomForestRegressor(criterion = 'squared_error')
model_input_var3.fit(X_train_3, Y_train)

# 각 모델로 test 셋들을 예측해주세요.

y_pred_1 = model_input_var1.predict(test_1)
y_pred_2 = model_input_var2.predict(test_2)
y_pred_3 = model_input_var3.predict(test_3)

# 각 결과들을 submission 파일로 저장해주세요.

submission_1 = pd.read_csv('./projects/DACON/ddareun/submission.csv')
submission_2 = pd.read_csv('./projects/DACON/ddareun/submission.csv')
submission_3 = pd.read_csv('./projects/DACON/ddareun/submission.csv')

submission_1['count'] = y_pred_1
submission_2['count'] = y_pred_2
submission_3['count'] = y_pred_3

submission_1.to_csv('./projects/DACON/ddareun/sub_1.csv',index=False)
submission_2.to_csv('./projects/DACON/ddareun/sub_2.csv',index=False)
submission_3.to_csv('./projects/DACON/ddareun/sub_3.csv',index=False)

##################################################################################################


pred = model.predict(test)
print(pred[:5])
#print(pred)
#print(test_dn)

submission = test
submission.to_csv('./projects/DACON/ddareun/submission.csv',index=False)

submission = pd.read_csv('./projects/DACON/ddareun/submission.csv')
submission['count'] = pred
submission.to_csv('./projects/DACON/ddareun/submission.csv',index=False)

# X_train 에서 drop 할 피쳐의 경우에 수 대로 3개의 X_train 을 생성하세요.
#
#
##################################################################################################
#
from sklearn.model_selection import GridSearchCV

model = RandomForestRegressor(criterion = 'squared_error', random_state=2020)

params = {'n_estimators': [200, 300, 500],
          'max_features': [5, 6, 8],
          'min_samples_leaf': [1, 3, 5]}

greedy_CV = GridSearchCV(model, param_grid=params, cv = 3, n_jobs = -1)
greedy_CV.fit(X_train_3, Y_train)

pred = greedy_CV.predict(test_3)
#pred

submission = pd.read_csv('./projects/DACON/ddareun/submission.csv')

import numpy as np

submission['count'] = np.round(pred, 2)

submission.head()

submission.to_csv('./projects/DACON/ddareun/sub.csv',index=False)
