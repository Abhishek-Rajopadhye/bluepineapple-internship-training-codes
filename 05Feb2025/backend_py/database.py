"""
This module provides functions to load and save data from JSON files.
"""

import json

BOOKS_FILE = "storage/books.json"
MEMBERS_FILE = "storage/members.json"
ALLOCATIONS_FILE = "storage/allocated_books.json"

def loadData(fileName: str) -> dict:
    """
    Load data from a JSON file.
 
    Args:
        fileName (str): The name of the file to load.

    Returns:
        dict: The data loaded from the file.
    """
    with open(fileName, "r") as fileData:
        return json.load(fileData)

def saveData(fileName: str, data: dict) -> None:
    """
    Save data to a JSON file.
 
    Args:
        fileName (str): The name of the file to save.
        data (dict): The data to save.
    """
    with open(fileName, "w") as file:
        json.dump(data, file, indent=4)
