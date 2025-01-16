import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from dotenv import dotenv_values
from pymongo import MongoClient
from be.main import app

config = dotenv_values(".env")
app.database = app.mongodb_client["DB_BOOK" + "_test"]

# create
def test_create_book():
    with TestClient(app) as client:
        response = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"})

        assert response.status_code == 201
        body = response.json()
        assert body.get("book_title") == "english"
        assert body.get("author") == "Raj"
        assert body.get("category") == "fc"
        assert body.get("publish_date") == "1/09/2024"
        assert body.get("author_id") == '000'
        assert body.get("category_id") == '123'
        assert body.get("desc") == 'yes'
        assert body.get("price") == 200
        assert "_id" in body

#list
def test_list_book(capsys):
    with TestClient(app) as client:
        with capsys.disabled():
            print('list books')
        get_books_response = client.get("/api/book/")
        assert get_books_response.status_code == 200

#find     
def test_find_book():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        get_book_response = client.get("/api/book/" + new_book.get("_id"))
        assert get_book_response.status_code == 200
        assert get_book_response.json() == new_book

#delete
def test_delete_book():
    with TestClient(app) as client:
        new_book = client.post("/api/book/",json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        delete_book_response = client.delete("/api/book/" + new_book.get("_id"))
        assert delete_book_response.status_code == 204

# TEST CASE FOR UPDATE
def test_update_book_title():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"book_title": "Hindi"})
        assert response.status_code == 200
        assert response.json().get("book_title") == "Hindi"

def test_update_author_id():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"author_id": "11"})
        assert response.status_code == 200
        assert response.json().get("author_id") == "11"
        

def test_update_author():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"author": "Shiv Khera"})
        assert response.status_code == 200
        assert response.json().get("author") == "Shiv Khera"

def test_update_category_id():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"category_id": "fic"})
        assert response.status_code == 200
        assert response.json().get("category_id") == "fic"
        
def test_update_category():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"category": "fiction"})
        assert response.status_code == 200
        assert response.json().get("category") == "fiction"
        
def test_update_price():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"price": 80})
        assert response.status_code == 200
        assert response.json().get("price") == 80
        
def test_update_publish_date():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"publish_date": "2/2/24"})
        assert response.status_code == 200
        assert response.json().get("publish_date") == "2/2/24"

def test_update_desc():
    with TestClient(app) as client:
        new_book = client.post("/api/book/", json={"book_title": "english", "author_id": "000",  "author": "Raj","category_id": "123","category": "fc","publish_date": "1/09/2024","price": 200,  "desc": "yes"}).json()

        response = client.post("/api/book/" + new_book.get("_id"), json={"desc": "good book"})
        assert response.status_code == 200
        assert response.json().get("desc") == "good book"


