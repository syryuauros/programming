#!./result-1/bin/python3


import pandas as pd
import sklearn
from sklearn.tree import DecisionTreeClassifier

train = pd.read_csv('./projects/DACON/ddareun/train.csv')
test = pd.read_csv('./projects/DACON/ddareun/test.csv')

#test_fn = test.fillna(0)
train_dn = train.dropna()
test_dn = test.dropna()

X_train = train_dn.drop(['count'], axis=1)
Y_train = train_dn['count']
#Y_test = test_dn['count']


#print(test.shape)
#print(test.head())
#print(test_dn.info())
#print(test.isnull())
#
model = DecisionTreeClassifier()
model.fit(X_train,Y_train)
#print(train_dn)
#print(X_train)
#print(Y_train)

pred = model.predict(test_dn)
print(pred[:5])
#print(pred)
#print(test_dn)

submission = test_dn
submission.to_csv('./projects/DACON/ddareun/submission.csv',index=False)

submission = pd.read_csv('./projects/DACON/ddareun/submission.csv')
submission['count'] = pred
submission.to_csv('./projects/DACON/ddareun/submission.csv',index=False)
