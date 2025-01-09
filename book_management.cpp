#include<iostream>
#include<string>
#include<map>

using namespace std;

class Book{
    private:
        string author;
        string book_name;
        int number_of_copies;
    public:
        Book(string author, string book_name){
            this->author = author;
            this->book_name = book_name;
        }
        string getAuthor(){
            return this->author;
        }
        string getBookName(){
            return this->book_name;
        }
        int getNumberOfCopies(){
            return this->number_of_copies;
        }
        void allocateBook(){
            this->number_of_copies--;
        }
        void deallocateBook(){
            this->number_of_copies++;
        }
        void printBook(){
            cout<<"Book Name: "<<this->book_name<<endl;
            cout<<"Author: "<<this->author<<endl;
            cout<<"Number of copies: "<<this->number_of_copies<<endl;
        }
}


class BookManagement{
    private:
        map<string, Book> books;
        int count;
    public:
        void addBook(string author, string book_name, int number_of_copies){
            Book book(author, book_name);
            book.number_of_copies = number_of_copies;
            this->books.insert(pair<string, Book>(book_name, book));
            this->count++;
        }

        void deleteBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
            }else{
                this->books.erase(book_name);
                this->count--;
            }
        }

        void allocateBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
            }else{
                this->books[book_name].allocateBook();
            }
        }

        void deallocateBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
            }else{
                this->books[book_name].deallocateBook();
            }
        }

        Book* getBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
                return NULL;
            }else{
                return &this->books[book_name];
            }
        }

        void printAllBooks(){
            for(int i=0; i<this->count; i++){
                this->books[i].printBook();
            }
        }
}

void displayMenu() {
    cout << "Book Management System" << endl;
    cout << "1. Add Book" << endl;
    cout << "2. Remove Book" << endl;
    cout << "3. Allocate Book" << endl;
    cout << "4. Deallocate Book" << endl;
    cout << "5. Search Book" << endl;
    cout << "6. Exit" << endl;
    cout << "Enter your choice: ";
}

int main(){
    BookManagement bookManagement;

    while(True){

        displayMenu();
        int choice;
        cin>>choice;

        switch(choice){
            case 1:
                string author, book_name;
                int number_of_copies;
                cout<<"Enter author name: ";
                cin>>author;
                cout<<"Enter book name: ";
                cin>>book_name;
                cout<<"Enter number of copies: ";
                cin>>number_of_copies;
                bookManagement.addBook(author, book_name, number_of_copies);
                break;
            case 2:
                string book_name;
                cout<<"Enter book name: ";
                cin>>book_name;
                bookManagement.deleteBook(book_name);
                break;
            case 3:
                string book_name;
                cout<<"Enter book name: ";
                cin>>book_name;
                bookManagement.allocateBook(book_name);
                break;
            case 4:
                string book_name;
                cout<<"Enter book name: ";
                cin>>book_name;
                bookManagement.deallocateBook(book_name);
                break;
            case 5:
                string book_name;
                cout<<"Enter book name: ";
                cin>>book_name;
                Book* book = bookManagement.getBook(book_name);
                if(book != NULL){
                    book->printBook();
                }
                break;
            case 6:
                break;
            default:
                cout<<"Invalid choice"<<endl;
        }
    }
    cout<<"Exiting Program"<<endl;
}