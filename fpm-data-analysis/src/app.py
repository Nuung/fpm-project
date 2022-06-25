
# module 
from util.file_util import (save_csv, save_json)
from util.mongodb import (DbCon)
import pymongo

# python lib
from flask import (Flask, request, send_file, json, jsonify)
from flask_cors import CORS
from operator import itemgetter
import datetime

# static
app = Flask("SuperScrapper")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
main_db_con = DbCon() # db connection

# =================================================== # 
# api test (server health check)
# =================================================== # 

# BE TEST PING 
@app.route("/data/ping", methods=['GET'])
def test_ping():
    req_ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    response = app.response_class(
        status=200,
        response=json.dumps({"test": "ok", "request_id": req_ip}),
        mimetype='application/json'
    )
    return response


@app.route("/data/user", methods=['POST'])
def user_kmeans():
    # mongodb connection
    db = main_db_con.get_con()
    res = dict()
    try:
        if main_db_con.is_coll_exists("user_info"):
            total_count = db[f"user_info"].count_documents({})
            res = { "total_count": total_count }
        else:
            raise Exception("There is no any collection named user_info")
    except Exception as e:
        res = { "error": e }

    return app.response_class(
        status=200,
        response=json.dumps(res),
        mimetype='application/json'
    )



# # 등록된 키워드 리스트 가져오기
# @app.route("/api/keyword", methods=['GET'])
# def getKeywords():
#     try:
#         result = main_db_con.get_init_data("init_keyword")
#         return app.response_class(
#             status=200,
#             response=json.dumps({"data": result}),
#             mimetype='application/json'
#         )
#     except Exception as e:
#         return app.response_class(
#             status=500,
#             response=json.dumps({"error": f"server error: {e}"}),
#             mimetype='application/json'
#         )


# # 등록된 키워드 기반, 각 키워드 추천 상위 권 1위 가져오기
# @app.route("/api/keyword/rank", methods=['GET'])
# def getKeywordsRank():
#     keywords = main_db_con.get_init_data("init_keyword")
    
#     # mongodb connection
#     db = main_db_con.get_con()
#     results = list()
#     for keyword in keywords['keywords']:
#         try:
#             result = db[f"{keyword}_jobs"].find({},{"_id":0}).sort("recommend", pymongo.DESCENDING).limit(1)
#             for r in result:
#                 r['keyword'] = keyword
#                 results.append(r)
#         except Exception:
#             continue

#     # 다시 전체를 추천 순으로 변경
#     results = sorted(results, key=itemgetter('recommend'), reverse=True)
#     results = results[:3]

#     return app.response_class(
#         status=200,
#         response=json.dumps({"data": results}),
#         mimetype='application/json'
#     )    



# # =================================================== # 
# # (main) search API
# # =================================================== # 

# # 메인 API, 검색 결과 얻어오기
# @app.route("/api/search", methods=['GET'])
# def searchJobs():
    
#     # mongodb connection
#     db = main_db_con.get_con()

#     keyword = request.args.get('keyword', "all").lower() 
#     page = int(request.args.get('page', 1))
#     row = 20

#     # 1. 해당 keyword가 DB에 존재하는가? -> collection 존재 여부 체크
#     # 1-1. 존재한다면 DB 데이터 조회해서 반환하기
#     if main_db_con.is_coll_exists(f"{keyword}_jobs"):
#         total_count = db[f"{keyword}_jobs"].count_documents({})
#         results = db[f"{keyword}_jobs"].find({},{"_id":0}).sort("id", pymongo.ASCENDING).skip((row * page) - row).limit(row)
#         result_list = list()
#         for r in results:
#             result_list.append(r)

#         response = app.response_class(
#             status=200,
#             response=json.dumps({
#                 "total_count": total_count,
#                 "data": result_list,
#             }),
#             mimetype='application/json'
#         )

#     # 1-2. 존재하지 않는다면, 크롤링 진행 후 긁어온 데이터 DB 저장하고 반환하기 -> 흠 이건 너무 작업이 해비함
#     else:
#         results = crawler(keyword)
#         result_list = list(results)

#         response = app.response_class(
#             status=200,
#             response=json.dumps({
#                 "total_count": len(result_list),
#                 "data": result_list
#             }),
#             mimetype='application/json'
#         )

#     return response

# # 검색 결과 추출 
# @app.route("/api/export", methods=['GET'])
# def exportJobs():
#     keyword = request.args.get('keyword')
#     type = request.args.get('type')

#     if not keyword:
#         raise Exception()

#     keyword = keyword.lower()

#     # keyword에 대해, DB 조회
#     jobs = [{"title": "python developer", "company": "naver", "location": "sungNam", "link": "https://www.naver.com"}]

#     if not jobs:
#         raise Exception()

#     file_name = f"{keyword}_{datetime.datetime.now()}"

#     if type == "csv":
#         save_csv(file_name, ["Title", "Company", "Location", "Link"], jobs)
#         return send_file(f"{file_name}.csv")
#     elif type == "json":
#         save_json(file_name, jobs)
#         return send_file(f"{file_name}.json")


# # =================================================== # 
# # 따봉 API
# # =================================================== # 

# # 따봉 누르기
# @app.route("/api/job/<string:job_id>", methods=['PUT', 'PATCH'])
# def updateJobRecommend(job_id: str):
    
#     # 빠른 collection 탐색을 위한 query str 값
#     keyword = request.args.get('keyword', None)

#     if keyword and job_id:
    
#         # mongodb connection
#         db = main_db_con.get_con()
        
#         # 요청한 IP에서 해당 job_id 따봉 기록이 있는가?
#         req_ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
#         chk = db['recommend_log'].find_one({"ip": req_ip, "job_id": job_id}, {"_id":0})
#         if chk:
#             return app.response_class(
#                 status=406,
#                 response=json.dumps({"error": f"you already recommended!"}),
#                 mimetype='application/json'
#             )
        
#         # 따봉 기록이 없으면
#         target = db[f'{keyword}_jobs'].find_one({"id": job_id}, {"_id":0})
#         recommend = int(target['recommend']) + 1
#         db[f'{keyword}_jobs'].update_one({"id": job_id}, {"$set":{"recommend": recommend}})

#         # 따봉 기록 만들기
#         db['recommend_log'].insert_one({"ip": req_ip, "job_id": job_id, "created_at": datetime.datetime.now()})

#         return app.response_class(
#             status=201,
#             response=json.dumps({"message": f"{job_id} update clear!"}),
#             mimetype='application/json'
#         )

#     else:
#         return app.response_class(
#             status=400,
#             response=json.dumps({"error": f"url from was wrong!"}),
#             mimetype='application/json'
#         )


# # 내 IP 기준 따봉누른 리스트 가져오기
# @app.route("/api/job/<string:job_id>", methods=['GET'])
# def getJobRecommend(job_id: str):
#     # mongodb connection
#     db = main_db_con.get_con()

#     # 요청한 IP
#     req_ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
#     chk = db['recommend_log'].find({"ip": req_ip, "job_id": job_id}, {"_id": 0})

#     if chk:
#         return app.response_class(
#             status=200,
#             response=json.dumps({"data": chk}),
#             mimetype='application/json'
#         )
#     else:
#         return app.response_class(
#             status=400,
#             response=json.dumps({"error": "there is no any data"}),
#             mimetype='application/json'
#         )

app.run(host='0.0.0.0', port=8000, debug=True)