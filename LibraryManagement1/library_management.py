import library

def printMenu():
    print("1. Add Book")
    print("2. Display Books")
    print("3. Delete Book")
    print("4. Issue Book")
    print("5. Return Book")
    print("6. Search Book")
    print("7. Exit")

def printBook(book):
    print("---------------------------------------")
    print("Title: ", book["title"])
    print("Author: ", book["author"])
    print("Copies: ", book["copies"])
    print("---------------------------------------")

def printBooks(books):
    for book in books:
        printBook(book)

lib = library.Library()

printMenu()
choice = int(input("Enter your choice: "))

while choice != 7:
    if choice == 1:
        title = input("Enter title: ")
        author = input("Enter author: ")
        copies = int(input("Enter copies: "))
        lib.addBook(title, author, copies)
    elif choice == 2:
        printBooks(lib.getBooks())
    elif choice == 3:
        title = input("Enter title: ")
        if lib.deleteBook(title):
            print("Book deleted")
        else:
            print("Book not found")
    elif choice == 4:
        title = input("Enter title: ")
        if lib.allocateBook(title):
            print("Book issued")
        else:
            print("Book not available")
    elif choice == 5:
        title = input("Enter title: ")
        if lib.deallocateBook(title):
            print("Book returned")
        else:
            print("Book not found")
    elif choice == 6:
        title = input("Enter title: ")
        book = lib.getBook(title)
        if book:
            printBook(book)
        else:
            print("Book not found")

    printMenu()
    choice = int(input("Enter your choice: "))