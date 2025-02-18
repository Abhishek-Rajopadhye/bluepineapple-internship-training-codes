"""
This module implements a FastAPI application for managing books and members in a library system.
It provides endpoints for CRUD operations on books and members, as well as for allocating and deallocating books to members.
"""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import books, members, allocations

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(books.router)
app.include_router(members.router)
app.include_router(allocations.router)

if __name__ == "__main__":
    uvicorn.run(app, host="http://localhost", port=8000)