""" 
Module contains the routes for the allocations API.

Endpoints:
    - GET /allocations: Get all allocations.
    - POST /allocations: Allocate a book to a member.
    - DELETE /allocations/{book_isbn}/{member_id}: Deallocate a book from a member.
"""

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from models import AllocationDetails
from database import loadData, saveData, ALLOCATIONS_FILE, BOOKS_FILE

router = APIRouter(prefix="/allocations", tags=["Allocations"])

@router.get("/")
def getAllocations():
    """
    Get all allocations.
    """
    allocations = loadData(ALLOCATIONS_FILE)
    return allocations["allocations"]

@router.post("/")
def allocateBook(allocation_data: AllocationDetails):
    """
    Allocate a book to a member.

    Args:
        allocation_data (AllocationDetails): Details of the book allocation.

    Returns:
        dict: Success message or error message.
    """
    books = loadData(BOOKS_FILE)
    allocations = loadData(ALLOCATIONS_FILE)

    # Find the book by ISBN
    book = next((b for b in books["books"] if b["isbn"] == allocation_data.book_isbn), None)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book["allocated_copies"] >= book["total_copies"]:
        raise HTTPException(status_code=400, detail="All copies of the book are already allocated")

    # Check if the book is already allocated to the same member
    for allocated_book in allocations["allocations"]:
        if allocated_book["book_isbn"] == allocation_data.book_isbn and allocated_book["user_id"] == allocation_data.user_id:
            raise HTTPException(status_code=400, detail="Book already allocated to this member")

    # Increase allocated copies
    book["allocated_copies"] += 1
    allocations["allocations"].append(jsonable_encoder(allocation_data))

    saveData(ALLOCATIONS_FILE, allocations)
    saveData(BOOKS_FILE, books)

    return {"message": "Book allocated successfully"}

@router.delete("/{book_isbn}/{member_id}")
def deallocateBook(book_isbn: str, member_id: int):
    """
    Deallocate a book from a member.

    Args:
        book_isbn (str): The ISBN of the book to deallocate.
        member_id (int): The ID of the member.

    Returns:
        dict: Success message.
    """
    books = loadData(BOOKS_FILE)
    allocations = loadData(ALLOCATIONS_FILE)

    # Find the book
    book = next((b for b in books["books"] if b["isbn"] == book_isbn), None)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    # Filter out the allocation
    new_allocations = [
        allocation for allocation in allocations["allocations"]
        if not (allocation["book_isbn"] == book_isbn and allocation["user_id"] == member_id)
    ]

    if len(new_allocations) == len(allocations["allocations"]):
        raise HTTPException(status_code=400, detail="No such allocation found")

    # Reduce allocated copies
    book["allocated_copies"] -= 1

    allocations["allocations"] = new_allocations
    saveData(ALLOCATIONS_FILE, allocations)
    saveData(BOOKS_FILE, books)

    return {"message": "Book deallocated successfully"}
