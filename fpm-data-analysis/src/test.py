

import pandas as pd
import numpy as np
from util.mongodb import (DbCon)
from sklearn.preprocessing import MinMaxScaler 
from sklearn.cluster import KMeans

df = pd.DataFrame(columns=['age', 'asset'])    # 2차원 배열 저장, [나이, 모든 총 자산]
main_db_con = DbCon() # db connection
db = main_db_con.get_con()
users = db["user_info"].find({})
total_asset_list = ["depositTotalAmt", "insureAmt", "irpAmt", "stockAmt"]

for i, user in enumerate(users):
    total_asset = 0
    user_financial = db["financialDetail"].find_one({"userId": user["userId"]})
    
    # 모든 자산 금액 더하기
    for key, value in user_financial.items():
        if key in total_asset_list:
            total_asset += int(value)
    
    # data frame에 세팅
    df.loc[i] = [user["age"].split("대")[0], total_asset]


# 데이터 전처리 - 노말라이제이션
data = df[['age', 'asset']]
scaler = MinMaxScaler()
data_scale = scaler.fit_transform(data)

print("노말라이제이션")
print(data_scale)

# 그룹 수, random_state 설정
k = 8
model = KMeans(n_clusters = k, random_state = 10)
model.fit(data_scale)   # 정규화된 데이터에 학습

# 클러스터링 결과 각 데이터가 몇 번째 그룹에 속하는지 저장
df['cluster'] = model.fit_predict(data_scale)

# 디노말라이제이션
print("디노말라이제이션")
print(data)

import matplotlib.pyplot as plt

plt.figure(figsize = (8, 8))

for i in range(k):
    plt.scatter(df.loc[df['cluster'] == i, 'age'], df.loc[df['cluster'] == i, 'asset'], 
                label = 'cluster ' + str(i))

plt.legend()
plt.title('K = %d results'%k , size = 15)
plt.xlabel('age', size = 12)
plt.ylabel('asset', size = 12)
plt.show()


