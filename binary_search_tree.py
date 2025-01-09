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
            print("{} is found".format(value))
            return True
        if value < self.value:
            return self.left.search(value)
        else:
            return self.right.search(value)