import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from dotenv import dotenv_values
from pymongo import MongoClient
from be.main import app

config = dotenv_values(".env")
app.database = app.mongodb_client["DB_BOOK" + "_test"]


#create
def test_create_member():
    with TestClient(app) as client:
        response = client.post("/api/member/" , json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"})
        assert response.status_code == 201

        body = response.json()
        assert body.get("member_name") == "Savitri"
        assert body.get("member_email") == "savitri@gmail.com"
        assert body.get("phone_number") == "1111111111"
        assert body.get("Password") == "123"
        assert body.get("pic") == "123"
        assert "_id" in body

#list
def test_list_members(capsys):
    with TestClient(app) as client:
        with capsys.disabled():
            print('list members')
        get_members_response = client.get("/api/member/")
        assert get_members_response.status_code == 200
        
#find     
def test_find_member():
    with TestClient(app) as client:
        new_member = client.post("/api/member/", json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        get_member_response = client.get("/api/member/" + new_member.get("_id"))
        assert get_member_response.status_code == 200
        assert get_member_response.json() == new_member

#delete
def test_delete_member():
    with TestClient(app) as client:
        new_member = client.post("/api/member/",json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        delete_member_response = client.delete("/api/member/" + new_member.get("_id"))
        assert delete_member_response.status_code == 204

# update member name
def test_update_member_name():
    with TestClient(app) as client:
        new_member = client.post("/api/member/", json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        response = client.post("/api/member/" + new_member.get("_id"), json={"member_name": "Savitri Kour"})
        assert response.status_code == 200
        assert response.json().get("member_name") == "Savitri Kour"

# update member email
def test_update_member_email():
    with TestClient(app) as client:
        new_member = client.post("/api/member/", json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        response = client.post("/api/member/" + new_member.get("_id"), json={"member_email": "savitri11@gmail.com"})
        assert response.status_code == 200
        assert response.json().get("member_email") == "savitri11@gmail.com"
   
# update member phone number
def test_update_member_phone_number():
    with TestClient(app) as client:
        new_member = client.post("/api/member/", json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        response = client.post("/api/member/" + new_member.get("_id"), json={"phone_number":"2222222222"})
        assert response.status_code == 200
        assert response.json().get("phone_number") == "2222222222"
   
# update member Password
def test_update_member_Password():
    with TestClient(app) as client:
        new_member = client.post("/api/member/", json={"member_name": "Savitri","member_email": "savitri@gmail.com","phone_number":"1111111111","Password":"123","pic":"123"}).json()

        response = client.post("/api/member/" + new_member.get("_id"), json={"Password":"1234"})
        assert response.status_code == 200
        assert response.json().get("Password") == "1234"
   