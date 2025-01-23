import math
import random
class BinarySearchTree:
    def __init__(self,val=None):
        self.value = val
        if self.value:
            self.left = BinarySearchTree()
            self.right = BinarySearchTree()
        else:
            self.left = None
            self.right = None

    def isempty(self):
        return (self.value == None)
    
    def insert(self, data):
        if self.isempty():
            self.value = data            
            self.left = BinarySearchTree()
            self.right = BinarySearchTree()
        elif data < self.value:
            self.left.insert(data)
            return
        elif data > self.value:
            self.right.insert(data)
        elif data == self.value:
            return
    
    def search(self, value):
        if self.isempty():
            return False
        if self.value == value:
            print(str(value) + " is found")
            return True
        if value < self.value:
            return self.left.search(value)
        else:
            return self.right.search(value)

btree = BinarySearchTree()
randomList = [random.randint(1, 100) for i in range(10)]

for number in randomList:
    btree.insert(number)

print("Numbers inserted: ", randomList)

search = randomList[random.randint(0, 9)]
searcherror = 9999999

print("Searching for " + str(search))
returnvalue = btree.search(search)

if not returnvalue:
    print(str(search) + " is not found")

print("Searching for " + str(searcherror))
returnvalueerror = btree.search(searcherror)

if not returnvalueerror:
    print(str(searcherror) + " is not found")

