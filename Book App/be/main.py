import uvicorn
from fastapi import FastAPI, Request, Form
from dotenv import dotenv_values
from pymongo import MongoClient
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

config = dotenv_values(".env")
app = FastAPI()
app.mount("/fe", StaticFiles(directory="fe"),name="fe")
app.mount("/me", StaticFiles(directory="me"),name="me")

app.mongodb_client = MongoClient(config["CONNECTION_STRING"])
app.database = app.mongodb_client[config["DB_BOOK"]]

from be.author.api import author_api as author_apiroutes
app.include_router(author_apiroutes, tags=["authors"], prefix="/api/author")

from be.book.api import book_api as book_apiroutes
app.include_router(book_apiroutes, tags=["books"], prefix="/api/book")

from be.member.api import member_api as member_apiroutes
app.include_router(member_apiroutes, tags=["members"], prefix="/api/member")

@app.get("/")
async def home(request: Request):
  return FileResponse('fe/index.html')
 
@app.post("/login/")
async def login(request: Request):
    p_login = await request.json()

    if (p_login['userid'] == 'admin@book.org' and p_login['pwd'] == '123'):
        ret_json = {'userid':'0','username':'Library Admin','role_id':'admin'}
        return {"success": True,"message": "User","data": ret_json}
    else:
        member = request.app.database["members"].find_one({'member_email': p_login['userid'], 'Password':p_login['pwd']})
        if member :
            ret_json = {'userid':member['_id'],'username':member['member_name'],'role_id':'user'}
            return {"success": True,"message": "User","data": ret_json}
        else:
            return {"success": False,"message": "Invalid Credentials"}
