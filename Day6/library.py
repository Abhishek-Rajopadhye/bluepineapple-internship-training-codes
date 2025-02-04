import sqlite3

class Library():
    def __init__(self):
        self.sqliteConnector = sqlite3.connect("library.db")
        self.sqlCursor = self.sqliteConnector.cursor()
        self.books = []
        query = "SELECT count(name) FROM sqlite_master WHERE type='table' AND name='books';"
        self.sqlCursor.execute(query)
        if(self.sqlCursor.fetchone()[0] == 1):
            self.sqlCursor.execute("SELECT * FROM 'books';")
            result =  self.sqlCursor.fetchall()
            for r in result:
                self.books.append({"title": r[1], "author": r[2], "copies": r[3]})
        else:
            self.sqlCursor.execute("CREATE TABLE 'books' (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT NOT NULL, copies INTEGER NOT NULL);")
            self.sqliteConnector.commit()

    def addBook(self, title, author, copies):
        self.sqlCursor.execute("INSERT INTO 'books' (title, author, copies) VALUES (?, ?, ?);", (title, author, copies))
        self.sqliteConnector.commit()
        self.books.append({"title": title, "author": author, "copies": copies})

    def deleteBook(self, title):
        for book in self.books:
            if book['title'] == title:
                self.sqlCursor.execute("DELETE FROM 'books' WHERE title = ?;", (title,))
                self.sqliteConnector.commit()
                self.books.remove(book)
                return True
        return False

    def getBooks(self):
        return [book for book in self.books]

    def getBook(self, title):
        for book in self.books:
            if book['title'] == title:
                return book
        return None
    
    def allocateBook(self, title):
        for book in self.books:
            if book['title'] == title:
                book['copies'] -= 1
                self.sqlCursor.execute("UPDATE books SET copies = ? WHERE title = ?;", (book['copies'], title))
                self.sqliteConnector.commit()
                return True
        return False

    def deallocateBook(self, title):
        for book in self.books:
            if book['title'] == title:
                book['copies'] += 1
                self.sqlCursor.execute("UPDATE books SET copies = ? WHERE title = ?;", (book['copies'], title))
                self.sqliteConnector.commit()
                return True
        return False