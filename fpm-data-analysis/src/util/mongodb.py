# Python module
import json
import os
import time
from dotenv import load_dotenv
from pymongo import MongoClient

# 환경변수값 세팅을
load_dotenv()

class DbCon:

    def __init__(self) -> None:
        self.main_client = self.get_main_client()

    # get connection
    def get_main_client(self):
        host = os.environ.get('MONGO_HOST', 'localhost')
        port = int(os.environ.get('MONGO_PORT'))
        user = os.environ.get('MONGO_INITDB_ROOT_USERNAME')
        password = os.environ.get('MONGO_INITDB_ROOT_PASSWORD')
        db = os.environ.get('MONGO_INITDB_DATABASE')

        client = MongoClient(
            host, 
            port, 
            connect=False,
            username=user,
            password=password,
            authSource='admin'
        )

        return client[f'{db}']

    # collection 존재 여부 체크
    def is_coll_exists(self, coll_name):
        if coll_name in self.main_client.list_collection_names(): return True
        else: return False


    # system_data 얻어오기 - 이니셜라이징 데이터
    def get_init_data(self, _type: str):
        return self.main_client.system_data.find_one({"type": _type}, {"_id":0})


    # connection obejct 얻어오기
    def get_con(self):
        return self.main_client
