import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from dotenv import dotenv_values
from pymongo import MongoClient
from be.main import app

config = dotenv_values(".env")
app.database = app.mongodb_client["DB_BOOK" + "_test"]

#create
def test_create_author():
    with TestClient(app) as client:
        response = client.post("/api/author/" , json={"name": "Chetan bhagat"})
        assert response.status_code == 201

        body = response.json()
        assert body.get("name") == "Chetan bhagat"
        assert "_id" in body

#list
def test_list_authors(capsys):
    with TestClient(app) as client:
        with capsys.disabled():
            print('list authors')
        get_authors_response = client.get("/api/author/")
        assert get_authors_response.status_code == 200
        
#find     
def test_find_author():
    with TestClient(app) as client:
        new_author = client.post("/api/author/", json={"name": "Chetan bhagat"}).json()

        get_author_response = client.get("/api/author/" + new_author.get("_id"))
        assert get_author_response.status_code == 200
        assert get_author_response.json() == new_author

#delete
def test_delete_author():
    with TestClient(app) as client:
        new_author = client.post("/api/author/",json={"name": "Chetan bhagat"}).json()

        delete_author_response = client.delete("/api/author/" + new_author.get("_id"))
        assert delete_author_response.status_code == 204

# update author name
def test_update_author_name():
    with TestClient(app) as client:
        new_author = client.post("/api/author/", json={"name": "Chetan bhagat"}).json()

        response = client.post("/api/author/" + new_author.get("_id"), json={"name": "Shiv Khera"})
        assert response.status_code == 200
        assert response.json().get("name") == "Shiv Khera"

