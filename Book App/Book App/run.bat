@echo off
start msedge http://localhost:8001/ -inPrivate
uvicorn be.main:app --reload --port 8001


