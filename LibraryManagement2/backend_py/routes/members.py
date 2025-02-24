"""
Module contains the routes for the members API.

Endpoints:
    - GET /members: Get all members.
    - GET /members/{member_id}: Get a member by ID.
    - POST /members: Add a new member.
    - PUT /members/{member_id}: Update a member by ID.
    - DELETE /members/{member_id}: Delete a member by ID.
"""

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from models import Member
from database import loadData, saveData, MEMBERS_FILE

router = APIRouter(prefix="/members", tags=["Members"])

@router.get("/")
def getMembers() -> list:
    """
    Get all members.
    
    Returns:
        list: The members data.
    
    Raises:
        500: Internal Server Error. If there is any error while retrieving all the members.
    """
    try:
        members = loadData(MEMBERS_FILE)
        return members["members"]
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))


@router.get("/{member_id}")
def getMember(member_id: int) -> dict:
    """
    Get a member by ID.
    
    Parameters:
        member_id (int): The ID of the member to retrieve.
    
    Returns:
        dict: The member details.
    
    Raises:
        404: If the member is not found.
        500: Internal Server Error. If there is any error when retrieving a specified member.
    """
    try:
        members = loadData(MEMBERS_FILE)
        member = next((m for m in members["members"] if m["id"] == member_id), None)

        if not member:
            raise HTTPException(status_code=404, detail="Member not found")

        return member
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))


@router.post("/")
def addMember(member_data: Member) -> dict:
    """
    Add a new member.
    
    Parameters:
        member_data (Member): The member details to add.
    
    Returns:
        dict: The member details.
        
    Raises:
        500: Internal Server Error. If there is any error while adding a new memeber.
    """
    try:
        members = loadData(MEMBERS_FILE)

        # Generate new member ID
        new_member_id = members["members"][-1]["id"] + 1 if members["members"] else 1
        member_data.id = new_member_id
        new_member = jsonable_encoder(member_data)

        members["members"].append(new_member)
        saveData(MEMBERS_FILE, members)

        return new_member
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))


@router.put("/{member_id}")
def updateMember(member_id: int, memberData: Member) -> dict:
    """
    Update a member by ID.
    
    Parameters:
        member_id (int): The ID of the member to update.
        memberData (Member): The updated member details.
    
    Returns:
        dict: Success message.
    
    Raises:
        404: If the member is not found.
        500: Internal Server Error. If there is any error while updating the member.
    """
    try:
        members = loadData(MEMBERS_FILE)
        member = next((m for m in members["members"] if m["id"] == member_id), None)

        if not member:
            raise HTTPException(status_code=404, detail="Member not found")

        member["name"] = memberData.name
        saveData(MEMBERS_FILE, members)

        return {"message": "Member updated successfully"}
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))

@router.delete("/{member_id}")
def deleteMember(member_id: int) -> dict:
    """
    Delete a member by ID.
    
    Parameters:
        member_id (int): The ID of the member to delete.
    
    Returns:
        dict: Success message.
    
    Raises:
        404: If the member is not found.
        500: Internal Server Error. If there is any error while deleting the member.
    """
    try:
        members = loadData(MEMBERS_FILE)
        member = next((m for m in members["members"] if m["id"] == member_id), None)

        if not member:
            raise HTTPException(status_code=404, detail="Member not found")

        members["members"].remove(member)
        saveData(MEMBERS_FILE, members)

        return {"message": "Member deleted successfully"}
    except Exception as exception:
        raise HTTPException(status_code=500, detail=str(exception))