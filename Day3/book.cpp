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
        Book(string author, string book_name, int number_of_copies){
            this->author = author;
            this->book_name = book_name;
            this->number_of_copies = number_of_copies;
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
        void allocatedBook(){
            this->number_of_copies--;
        }
        void deallocatedBook(){
            this->number_of_copies++;
        }
        void printBook(){
            cout<<"Book Name: "<<this->book_name<<endl;
            cout<<"Author: "<<this->author<<endl;
            cout<<"Number of copies: "<<this->number_of_copies<<endl;
        }
};


class BookManagement{
    private:
        //map documentation used for reference
        map<string, Book*> books;
        int count = 0;
    public:
        void addBook(string author, string book_name, int number_of_copies){
            Book *book = new Book(author, book_name, number_of_copies);
            this->books.insert(std::pair<string, Book*>(book_name, book));
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
                this->books[book_name]->allocatedBook();
            }
        }

        void deallocateBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
            }else{
                this->books[book_name]->deallocatedBook();
            }
        }

        void getBook(string book_name){
            if(this->books.find(book_name) == this->books.end()){
                cout<<"Book not found"<<endl;
                return;
            }else{
                this->books[book_name]->printBook();
                return;
            }
        }

        void printAllBooks(){
            //found iteration code on google
            for(auto it = this->books.begin(); it != this->books.end(); ++it){
                it->second->printBook();
            }
        }
};

void displayMenu() {
    cout << "Book Management System" << endl;
    cout << "1. Add Book" << endl;
    cout << "2. Remove Book" << endl;
    cout << "3. Allocate Book" << endl;
    cout << "4. Deallocate Book" << endl;
    cout << "5. Search Book" << endl;
    cout << "6. List All Books" << endl;
    cout << "7. Exit" << endl;
    cout << "Enter your choice: ";
}

int main(){
    BookManagement bookManagement;
    string author, book_name;
    int number_of_copies;
    int choice;
    while(true){
        displayMenu();
        cin>>choice;
        if(choice == 7){
            break;
        }
        switch(choice){
            case 1:
                {
                    cout<<"Enter author name: ";
                    cin>>author;
                    cout<<"Enter book name: ";
                    cin>>book_name;
                    cout<<"Enter number of copies: ";
                    cin>>number_of_copies;
                    bookManagement.addBook(author, book_name, number_of_copies);
                }
                break;
            case 2:
                {
                    cout<<"Enter book name: ";
                    cin>>book_name;
                    bookManagement.deleteBook(book_name);
                }
                break;
            case 3:
                {
                    cout<<"Enter book name: ";
                    cin>>book_name;
                    bookManagement.allocateBook(book_name);
                }
                break;
            case 4:
                {
                    cout<<"Enter book name: ";
                    cin>>book_name;
                    bookManagement.deallocateBook(book_name);
                }
                break;
            case 5:
                {
                    cout<<"Enter book name: ";
                    cin>>book_name;
                    bookManagement.getBook(book_name);
                }
                break;
            case 6:
                {
                    bookManagement.printAllBooks();
                }
                break;
            default:
                {
                    cout<<"Invalid choice"<<endl;
                }                
                break;
        }
    }
    cout<<"Exiting Program"<<endl;
    return 0;
}