import Node from "./node.js";

class Tree {
  constructor(arr) {
    // returns the root node of the tree
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = [...new Set(arr)].sort((a, b) => a - b);

    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);

    node.left = this.buildTree(arr.slice(0, mid));
    node.right = this.buildTree(arr.slice(mid + 1, arr.length));

    return node;
  }

  // inserts given value
  insert(node = this.root, value) {
    if (node === null) return new Node(value);

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  // deletes given value
  delete(node = this.root, value) {
    // base case
    if (node === null) return node;

    if (value < node.value) {
      node.left = this.delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.delete(node.right, value);
    }

    // node with no children
    if (node.left === null && node.right === null) return null;

    // node with one child
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // node with 2 children
    // replace current node with in-order successor
    node.value = this.findMinNode(node);
    // delete in-order successor from the right subtree
    node.right = this.delete(node.right, node.value);

    return node;
  }

  // find in-order successor
  findMinNode(node) {
    let currentNode = node.right;
    while (currentNode && currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }

  // returns node with given value
  find(value, node = this.root) {
    if (node === null) return "Value not found";

    if (value < node.value) return this.find(value, node.left);
    if (value > node.value) return this.find(value, node.right);

    return node;
  }

  // level order traversal
  levelOrder(func = null) {
    if (this.root === null) return;

    let queue = [];
    let result = [];
    queue.push(this.root);

    // while queue is not empty keep looping
    while (queue.length !== 0) {
      // take out node from front of queue
      const frontNode = queue.shift();

      if (func) {
        func(frontNode); // If a function was provided, call it on the node
      } else {
        result.push(frontNode.value); // If no function was provided, push node values into result array
      }

      // enqueue its children
      if (frontNode.left !== null) queue.push(frontNode.left);
      if (frontNode.right !== null) queue.push(frontNode.right);
    }

    return func ? null : result;
  }

  // in-order traversal
  inorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    this.inorder(func, node.left, result); // traverse left subtree
    func ? func(node) : result.push(node.value);
    this.inorder(func, node.right, result); // traverse right subtree

    return result;
  }

  // pre-order traversal
  preorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    func ? func(node) : result.push(node.value);
    this.preorder(func, node.left, result);
    this.preorder(func, node.right, result);

    return result;
  }

  // post-order traversal
  postorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    this.postorder(func, node.left, result);
    this.postorder(func, node.right, result);
    func ? func(node) : result.push(node.value);

    return result;
  }

  // returns height
  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // calculates depth as number of edges from root until given node
  depth(value, node = this.root) {
    if (node === null) return "Value not found";
    if (node.value === value) return 0;

    if (value > node.value) return this.depth(value, node.right) + 1;
    if (value < node.value) return this.depth(value, node.left) + 1;
  }

  // A balanced tree is one where the difference between heights of left subtree and right subtree is not more than 1.
  isBalanced(node = this.root) {
    if (node === null) return null;

    const leftSubtree = this.height(node.left);
    const rightSubtree = this.height(node.right);
    const difference = (leftSubtree, rightSubtree) => Math.abs(leftSubtree - rightSubtree);

    if(difference > 1) return false 

    return true
  }
}

export default Tree;
