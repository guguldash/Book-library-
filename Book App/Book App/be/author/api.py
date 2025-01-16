from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status
import uuid, json
from fastapi.encoders import jsonable_encoder
from typing import List
from be.author.model import authorCreate,authorUpdate

author_api = APIRouter()

#create api
@author_api.post("/", response_description="Create a new author",status_code=status.HTTP_201_CREATED, response_model=authorCreate)
async def create_author(request: Request, p_author: authorCreate = Body(...)):
    j_author = jsonable_encoder(p_author)
    new_author = request.app.database["authors"].insert_one(j_author)
    
    created_author = request.app.database["authors"].find_one(
        {"_id": new_author.inserted_id}
    )
    return created_author


#List Api 

@author_api.get("/", response_description="List all authors")
def list_author(request: Request):
    authors = list(request.app.database["authors"].find({}))
    return authors

#Delete

@author_api.delete("/{id}", response_description="Delete a author")
def delete_author(id: str, request: Request, response: Response):
    delete_result = request.app.database["authors"].delete_one({"_id": id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Author not found")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)


#Find

@author_api.get("/{id}", response_description="Get a single author by id")
def find_author(id: str, request: Request):
    author = request.app.database["authors"].find_one({"_id": id})
    return author   

#UPDATE 

@author_api.post("/{id}", response_description="Update a author",response_model=authorUpdate)
async def update_author(id: str, request: Request, author: authorUpdate = Body(...)):
    j_author = jsonable_encoder(author)
    update_result = request.app.database["authors"].update_one(
        {"_id": id}, {"$set": j_author}
    )
    updated_author = request.app.database["authors"].find_one({"_id": id})    
    return updated_author

