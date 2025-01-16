from fastapi import APIRouter, Body, Request, Form, Response, HTTPException, status
import uuid, json
from fastapi.encoders import jsonable_encoder
from typing import List
from be.book.model import bookCreate, m_bookUpdate


book_api = APIRouter()

#Create Api 
# @book_api .post("/", response_description="Create a new book",status_code=status.HTTP_201_CREATED, response_model=bookCreate)
# async def create_book(request: Request, p_book: bookCreate = Body(...)):
    # j_book = jsonable_encoder(p_book)
    # new_new = request.app.database["books"].insert_one(j_book )
    # created_book = request.app.database["books"].find_one(
        # {"_id": new_book.inserted_id}
    # )
    # return created_book
@book_api.post("/", response_description="Create a new book", status_code=status.HTTP_201_CREATED, response_model=bookCreate)
async def create_book(request: Request, p_book: bookCreate = Body(...)):
    j_book = jsonable_encoder(p_book)
    new_book = request.app.database["books"].insert_one(j_book)
    created_book = request.app.database["books"].find_one(
        {"_id": new_book.inserted_id}
    )
    return created_book


    
    
#List Api 
@book_api.get("/", response_description="List all books")
def list_book(request: Request, category:str='', author:str='',status:str='',user:str=''):
    qry = {}
    if (category != 'ALL'): qry['category_id'] = category
    if (author != 'ALL'): qry['author_id'] = author
    
    if (status == 'OUT'): qry['status'] = 'OUT'
    if (status == 'NOUT'): qry['status'] = {'$ne':'OUT'}
    if (user != ''): qry['mem_id'] = user


    books= list(request.app.database["books"].find(qry))
    return books
    
    
#Delete
@book_api.delete("/{id}", response_description="Delete a book")
def delete_book(id: str, request: Request, response: Response):
    delete_result = request.app.database["books"].delete_one({"_id": id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)

    
    
#Find
@book_api.get("/{id}", response_description="Get a single book by id")
def find_book(id: str, request: Request):
    book= request.app.database["books"].find_one({"_id": id})
    return book
    
    
#UPDATE 
@book_api.post("/{id}", response_description="Update a book",response_model=m_bookUpdate)
async def update_book(id: str, request: Request, p_book: m_bookUpdate = Body(...)):
    #j_book = jsonable_encoder(p_book)
    j_book = await request.json( )
    update_result = request.app.database["books"].update_one(
        {"_id": id}, {"$set": j_book }
    )
    updated_book = request.app.database["books"].find_one({"_id": id})    
    return updated_book



