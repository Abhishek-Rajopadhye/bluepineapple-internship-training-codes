import math
import random

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
class Tree:
    def __init__(self):
        self.root = None

    def insert(self, value, node=None):
        if self.root is None:
            self.root = TreeNode(value)
        else:
            if node is None:
                node = self.root
            if value < node.value:
                if node.left is None:
                    node.left = TreeNode(value)
                else:
                    self.insert(value, node.left)
            else:
                if node.right is None:
                    node.right = TreeNode(value)
                else:
                    self.insert(value, node.right)

    def bfs(self):
        if not self.root:
            return []
        queue = [self.root]
        result = []
        while queue:
            node = queue.pop(0)
            result.append(node.value)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return result

    def inorder_dfs(self, node):
        result = []
        if node:
            result.extend(self.inorder_dfs(node.left))
            result.append(node.value)
            result.extend(self.inorder_dfs(node.right))
        return result

    def preorder_dfs(self, node):
        result = []
        if node:
            result.append(node.value)
            result.extend(self.preorder_dfs(node.left))
            result.extend(self.preorder_dfs(node.right))
        return result

    def postorder_dfs(self, node):
        result = []
        if node:
            result.extend(self.postorder_dfs(node.left))
            result.extend(self.postorder_dfs(node.right))
            result.append(node.value)
        return result

tree = Tree()
random_list = [math.floor(random.random()*100) for i in range(10)]

print("Numbers inserted: ", random_list)

for number in random_list:
    tree.insert(number)

print("BFS: ", tree.bfs())
print("INORDER: ", tree.inorder_dfs(tree.root))
print("PREORDER: ", tree.preorder_dfs(tree.root))
print("POSTORDER: ", tree.postorder_dfs(tree.root))