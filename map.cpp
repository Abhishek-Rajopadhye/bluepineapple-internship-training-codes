#include<iostream>
#include<string>
using namespace std;

class Node{
    private:
        string key;
        string value;
        Node* next;
    public:
        Node(string key, string value){
            this->key = key;
            this->value = value;
            this->next = NULL;
        }
        string getKey(){
            return this->key;
        }
        string getValue(){
            return this->value;
        }
        Node* getNext(){
            return this->next;
        }
        void setNext(Node* next){
            this->next = next;
        }
        void setValue(string value){
            this->value = value;
        }
}

class Map{
    private:
        Node* root;
        int count;
    public:
        Map(){
            this->root = NULL;
            this->count = 0;
        }
        void insert(string key, string value) {
            Node* newNode = new Node(key, value);
            if (this->root == NULL || this->root->getKey() > key) {
                newNode->getNext() = this->root;
                this->root = newNode;
            } else {
                Node* temp = this->root;
                while (temp->next != NULL && temp->next->key < key) {
                    temp = temp->getNext();
                }
                newNode->getNext() = temp->getNext();
                temp->next = newNode;
            }
            this->count++;
        }
        void remove(string key){
            if(this->root == NULL){
                cout<<"Map is empty"<<endl;
            }else{
                Node* temp = this->root;
                Node* prev = NULL;
                while(temp != NULL){
                    if(temp->getKey() == key){
                        if(prev == NULL){
                            this->root = temp->getNext();
                        }else{
                            prev->next = temp->getNext();
                        }
                        delete temp;
                        this->count--;
                        return;
                    }
                    prev = temp;
                    temp = temp->getNext();
                }
                cout<<"Key not found"<<endl;
            }
        }
        void update(string key, string value){
            if(this->root == NULL){
                cout<<"Map is empty"<<endl;
            }else{
                Node* temp = this->root;
                while(temp != NULL){
                    if(temp->getKey() == key){
                        temp->setValue(value);
                        break;
                    }
                    temp = temp->getNext();
                }
                cout<<"Key not found"<<endl;
            }
        }
        int getCount(){
            return this->count;
        }
        string getValue(string key){
            if(this->root == NULL){
                cout<<"Map is empty"<<endl;
            }else{
                Node* temp = this->root;
                while(temp != NULL){
                    if(temp->getKey() == key){
                        return temp->getValue();
                    }
                    temp = temp->getNext();
                }
                cout<<"Key not found"<<endl;
            }
            return "";
        }
}
