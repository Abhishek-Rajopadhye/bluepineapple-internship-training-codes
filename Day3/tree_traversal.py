class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class Tree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = Node(value)
        else:
            self.insert(self.root, value)

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

    def inorder_dfs(self, node, result):
        if node:
            self.inorder_dfs(node.left, result)
            result.append(node.value)
            self.inorder_dfs(node.right, result)
        else:
            result = []
        return result

    def preorder_dfs(self, node, result):
        if node:
            result.append(node.value)
            self.preorder_dfs(node.left, result)
            self.preorder_dfs(node.right, result)
        else:
            result = []
        return result

    def postorder_dfs(self, node, result):
        if node:
            self.postorder_dfs(node.left, result)
            self.postorder_dfs(node.right, result)
            result.append(node.value)
        else:
            result = []
        return result
