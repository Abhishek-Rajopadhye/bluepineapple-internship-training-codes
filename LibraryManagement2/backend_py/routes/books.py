""" 
Module contains the routes for the books API.

Endpoints:
    - GET /books: Get all books.
    - GET /books/{book_isbn}: Get a book by ISBN.
    - POST /books: Add a new book.
    - PUT /books/{book_isbn}: Update a book by ISBN.
    - DELETE /books/{book_isbn}: Delete a book by ISBN.
"""

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from models import Book
from database import loadData, saveData, BOOKS_FILE

router = APIRouter(prefix="/books", tags=["Books"])

@router.get("/")
def getBooks() -> list:
    """
    Get all books.
    
    Working:
        Loads the data from the file.
        Returns the data.
    
    Returns:
        list: The books data.
    Raises:
        500: Internal Server Error. If there is an error loading the data
    """
    try:
        books = loadData(BOOKS_FILE)
        return books["books"]
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))

@router.get("/{book_isbn}")
def getBook(book_isbn: str) -> dict:
    """
    Get a book by ISBN.
    
    Working:
        Loads the data from the file.
        Filters the data on book isbn. If book not found raises error.
        Returns the book data.
    
    Parameters:
        book_isbn (str): The ISBN of the book to retrieve.
    
    Returns:
        dict: The book details.
    
    Raises:
        HTTPException: If the book is not found.
    """
    books = loadData(BOOKS_FILE)
    book = next((b for b in books["books"] if b["isbn"] == book_isbn), None)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    return book

@router.post("/")
def addBook(book: Book):
    """
    Add a new book.
    
    Working:
        Loads the data from the file.
        Appends new data to the existing data.
        Saves the data to the file.
    
    Parameters:
        book (Book): The book details to add.
    
    Returns:
        dict: The book details.
    """
    books = loadData(BOOKS_FILE)
    jsonBookData = jsonable_encoder(book)

    books["books"].append(jsonBookData)
    saveData(BOOKS_FILE, books)

    return book

@router.put("/{book_isbn}")
def updateBook(book_isbn: str, bookData: Book) -> dict:
    """
    Update a book by ISBN.
    
    Working:
        Loads the data from the file.
        Filters the book on book isbn. If book not found raises error.
        Changes the data of selected book.
        Saves the data to the file.
    
    Parameters:
        book_isbn (str): The ISBN of the book to update.
        bookData (Book): The updated book details.
    
    Returns:
        dict: Success message or error message.
    
    Raises:
        HTTPException: If the book is not found.
    """
    books = loadData(BOOKS_FILE)
    book = next((b for b in books["books"] if b["isbn"] == book_isbn), None)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    # Update book details
    book["name"] = bookData.name
    book["author"] = bookData.author
    book["total_copies"] = bookData.total_copies
    book["allocated_copies"] = bookData.allocated_copies

    saveData(BOOKS_FILE, books)

    return {"message": "Book updated successfully"}

@router.delete("/{book_isbn}")
def deleteBook(book_isbn: str) -> dict:
    """
    Delete a book by ISBN.
    
    Working:
        Loads the data from the file.
        Filters the data on book isbn. If book not found raises error.
        Removes the data of selected book.
        Saves the data to the file.
    
    Parameters:
        book_isbn (str): The ISBN of the book to delete.
    
    Returns:
        dict: Success message.
    
    Raises:
        HTTPException: If the book is not found.
    """
    books = loadData(BOOKS_FILE)
    book = next((b for b in books["books"] if b["isbn"] == book_isbn), None)

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    books["books"].remove(book)
    saveData(BOOKS_FILE, books)

    return {"message": "Book deleted successfully"}