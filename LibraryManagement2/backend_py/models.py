"""
Contains the models for the application
"""

from pydantic import BaseModel

class AllocationDetails(BaseModel):
    """
    Allocation details model.

    Attributes:
        user_id (int): The ID of the user to allocate the book to.
        book_isbn (str): The ISBN of the book to allocate.
        book_name (str): The name of the book to allocate.
        from_date (str): The date from which the book is allocated.
        to_date (str): The date until which the book is allocated
    """
    user_id: int
    book_isbn: str
    book_name: str
    from_date: str
    to_date: str

class Book(BaseModel):
    """
    Book Model
    
    Attributes:
        isbn (str): The ISBN of the book.
        name (str): The name of the book.
        author (str): The author of the book.
        total_copies (int): The total number of copies of the book.
        allocated_copies (int): The number of copies of the book that are already allocated
    """
    isbn: str
    name: str
    author: str
    total_copies: int
    allocated_copies: int

class Member(BaseModel):
    """
    Members Model
    
    Attributes:
        id (int): The ID of the member.
        name (str): The name of the member.
    """
    id: int
    name: str
