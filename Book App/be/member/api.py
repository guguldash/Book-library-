from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status
import uuid, json
from fastapi.encoders import jsonable_encoder
from typing import List

from be.member.model import memberCreate,memberUpdate


member_api = APIRouter()

   
    
 #create api
@member_api.post("/", response_description="Create a new member", status_code=status.HTTP_201_CREATED, response_model=memberCreate)
async def create_member(request: Request, p_member: memberCreate = Body(...)):
    j_member = jsonable_encoder(p_member)

    new_member = request.app.database["members"].insert_one(j_member)
    created_member = request.app.database["members"].find_one(
        {"_id": new_member.inserted_id}
    )
    return created_member



#List Api 

@member_api.get("/", response_description="List all members")
def list_member(request: Request):
    members = list(request.app.database["members"].find({}))
    return members
    
#Delete

@member_api.delete("/{id}", response_description="Delete a member")
def delete_member(id: str, request: Request, response: Response):
    delete_result = request.app.database["members"].delete_one({"_id": id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Member not found")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)


#Find

@member_api.get("/{id}", response_description="Get a single member by id")
def find_member(id: str, request: Request):
    member = request.app.database["members"].find_one({"_id": id})
    return member   

#UPDATE 

@member_api.post("/{id}", response_description="Update a member", response_model=memberUpdate)
async def update_member(id: str, request: Request,member: memberUpdate = Body(...)):
    j_member = jsonable_encoder(member)
    update_result = request.app.database["members"].update_one(
        {"_id": id}, {"$set": j_member}
    )
    updated_member = request.app.database["members"].find_one({"_id": id})    
    return updated_member

