#include <iostream>
#include <string>
using namespace std;

class Node {
private:
    string key;
    string value;
    Node* next;
public:
    Node(string key, string value) {
        this->key = key;
        this->value = value;
        this->next = NULL;
    }
    string getKey() {
        return this->key;
    }
    string getValue() {
        return this->value;
    }
    Node* getNext() {
        return this->next;
    }
    void setNext(Node* next) {
        this->next = next;
    }
    void setValue(string value) {
        this->value = value;
    }
};

class Map {
private:
    Node* root;
    int count;
public:
    Map() {
        this->root = NULL;
        this->count = 0;
    }
    void insert(string key, string value) {
        Node* newNode = new Node(key, value);
        if (this->root == NULL || this->root->getKey() > key) {
            newNode->setNext(this->root);
            this->root = newNode;
        } else {
            Node* temp = this->root;
            while (temp->getNext() != NULL && temp->getNext()->getKey() < key) {
                temp = temp->getNext();
            }
            newNode->setNext(temp->getNext());
            temp->setNext(newNode);
        }
        this->count++;
    }
    void remove(string key) {
        if (this->root == NULL) {
            cout << "Map is empty" << endl;
        } else {
            Node* temp = this->root;
            Node* prev = NULL;
            while (temp != NULL) {
                if (temp->getKey() == key) {
                    if (prev == NULL) {
                        this->root = temp->getNext();
                    } else {
                        prev->setNext(temp->getNext());
                    }
                    delete temp;
                    this->count--;
                    return;
                }
                prev = temp;
                temp = temp->getNext();
            }
            cout << "Key not found" << endl;
        }
    }
    void update(string key, string value) {
        if (this->root == NULL) {
            cout << "Map is empty" << endl;
        } else {
            Node* temp = this->root;
            while (temp != NULL) {
                if (temp->getKey() == key) {
                    temp->setValue(value);
                    return; // Return after updating
                }
                temp = temp->getNext();
            }
            cout << "Key not found" << endl;
        }
    }
    int getCount() {
        return this->count;
    }
    string getValue(string key) {
        if (this->root == NULL) {
            cout << "Map is empty" << endl;
        } else {
            Node* temp = this->root;
            while (temp != NULL) {
                if (temp->getKey() == key) {
                    return temp->getValue();
                }
                temp = temp->getNext();
            }
            cout << "Key not found" << endl;
        }
        return "";
    }
    string* getKeys() {
        string* keys = new string[this->count];
        Node* temp = this->root;
        int index = 0;
        while (temp != NULL) {
            keys[index++] = temp->getKey();
            temp = temp->getNext();
        }
        return keys;
    }


};

int main() {
    Map map;
    map.insert("aa", "aaaa");
    map.insert("ab", "aabb");
    map.insert("ac", "aacc");
    map.insert("ad", "aadd");
    map.insert("ae", "aaee");
    map.insert("b", "b");
    map.insert("c", "c");
    map.insert("d", "d");
    map.insert("e", "e");
    map.insert("f", "f");
    map.insert("g", "g");
    map.insert("h", "h");
    cout << "Count: " << map.getCount() << endl;
    for(int i=0; i<map.getCount(); i++) {
        cout << map.getKeys()[i] << " : " << map.getValue(map.getKeys()[i]) << endl;
    }
    return 0;
}