from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Dict, List
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

BOOKS_FILE = "../storage/books.json"
MEMBERS_FILE = "../storage/members.json"

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

class AllocationDetails(BaseModel):
    id: str
    book_name: str
    from_date: str
    to_date: str

class Book(BaseModel):
    isbn: str
    name: str
    author: str
    total_copies: int
    allocated_copies: int

class Member(BaseModel):
    id: int
    name: str
    allocated_books: List[AllocationDetails]
    
def loadData(fileName):
    with open(fileName, "r") as fileData:
        return json.load(fileData)

members = loadData(MEMBERS_FILE)
member_id = members["members"][-1]["id"] + 1 if members["members"][-1]["id"] else 0

def saveData(fileName, data):
    with open(fileName, "w") as file:
        json.dump(data, file, indent=4)

@app.get("/books")
def getBooks():
    books = loadData(BOOKS_FILE)
    return books["books"]

@app.get("/books/{book_isbn}")
def getBook(book_isbn:int):
    books = loadData(BOOKS_FILE)
    returnBook = {}
    for book in books["books"]:
        if(book["isbn"] == book_isbn):
            returnBook = book
    return returnBook

@app.post("/books")
def addBook(book: Book):
    books = loadData(BOOKS_FILE)
    jsonBookData = jsonable_encoder(book)
    books["books"].append(jsonBookData)
    saveData(BOOKS_FILE, books)
    return book

@app.put("/books/{book_isbn}")
def updateBook(book_isbn:str, bookData:Book):
    jsonBookData = jsonable_encoder(bookData)
    print(jsonBookData)
    books = loadData(BOOKS_FILE)
    for book in books["books"]:
        if(book["isbn"] == book_isbn):
            book["name"] = jsonBookData["name"]
            book["author"] = jsonBookData["author"]
            book["total_copies"] = jsonBookData["total_copies"]
            book["allocated_copies"] = jsonBookData["allocated_copies"]
    saveData(BOOKS_FILE, books)
    return "Success"

@app.delete("/books/{book_isbn}")
def deleteBook(book_isbn):
    books = loadData(BOOKS_FILE)
    bookToDelete = {}
    for book in books["books"]:
        if(book["isbn"] == book_isbn):
            bookToDelete = book
    books["books"].remove(bookToDelete)
    return "Success"

@app.get("/members")
def getMembers():
    return loadData(MEMBERS_FILE)

@app.get("/members/{member_id}")
def getMember(member_id:int):
    members = loadData(MEMBERS_FILE)
    returnMember = {}
    for member in members["members"]:
        if(member["id"] == member_id):
            returnMember = member
    return returnMember

@app.post("/members")
def addMember(member_data: Dict):
    global member_id
    members = loadData(MEMBERS_FILE)
    print(member_data)
    memberData = {
        "id": member_id,
        "name": member_data['member_name'],
        "allocated_books": []
    }
    jsonMemberData = jsonable_encoder(memberData)
    members["members"].append(jsonMemberData)
    member_id += 1
    saveData(MEMBERS_FILE, members)
    return memberData

@app.put("/members/{member_id}")
def updateMember(member_id:int, memberData:Member):
    members = loadData(MEMBERS_FILE)
    jsonMemberData = jsonable_encoder(memberData)
    for member in members["members"]:
        if(member["id"] == member_id):
            member["name"] = jsonMemberData["name"]
            member["allocated_books"] = jsonMemberData["allocated_books"]
    saveData(MEMBERS_FILE, members)
    return "Success"


@app.delete("/members/{member_id}")
def deleteMember(member_id):
    members = loadData(MEMBERS_FILE)
    memberToDelete = {}
    for member in members["members"]:
        if(member["id"] == member_id):
            memberToDelete = member
    members["members"].remove(memberToDelete)
    return "Success"

@app.put("/allocateBook/{book_isbn}/{to_member_id}")
def allocateBook(book_isbn: str, to_member_id: int, allocation_data: Dict):
    members = loadData(MEMBERS_FILE)
    books = loadData(BOOKS_FILE)
    for book in books["books"]:
        if book["isbn"] == book_isbn:
            if(book["allocated_copies"] >= book["total_copies"]):
                return {"error": "All copies of the book are already allocated"}
            else:
                book["allocated_copies"] += 1
    
    for member in members["members"]:
        if member["id"] == to_member_id:
            for allocated_book in member["allocated_books"]:
                if allocated_book["id"] == book_isbn:
                    return {"error": "Book already allocated to this member"}
            
            member["allocated_books"].append({
                "id": book_isbn,
                "book_name": allocation_data["book_name"],
                "from_date": allocation_data["from_date"],
                "to_date": allocation_data["to_date"]
            })

    saveData(MEMBERS_FILE, members)    
    saveData(BOOKS_FILE, books)

    return {"message": "Success"}


@app.put("/deallocateBook/{book_isbn}/{member_id}")
def deallocateBook(member_id: int, book_isbn: str):
    members = loadData(MEMBERS_FILE)
    books = loadData(BOOKS_FILE)
    
    for book in books["books"]:
        if book["isbn"] == book_isbn:
            book["allocated_copies"] -= 1
    saveData(BOOKS_FILE, books)

    for member in members["members"]:
        if member["id"] == member_id:
            # Find and remove the allocated book entry
            member["allocated_books"] = [
                book for book in member["allocated_books"] if book["id"] != book_isbn
            ]
    saveData(MEMBERS_FILE, members)

    return {"message": "Success"}
