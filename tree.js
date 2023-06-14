import Node from './node.js';

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
    node.right = this.buildTree(arr.slice(mid + 1));

    return node;
  }

  // inserts given value
  insert(data, node = this.root) {
    if (node === null) return new Node(data);

    if (data < node.data) {
      if (node.left === null) {
        node.left = new Node(data);
      } else {
        this.insert(data, node.left);
      }
    } else if (data > node.data) {
      if (node.right === null) {
        node.right = new Node(data);
      } else {
        this.insert(data, node.right);
      }
    }

    return node;
  }

  // deletes given value
  delete(data, node = this.root) {
    // base case
    if (node === null) return node;

    if (data < node.data) {
      node.left = this.delete(node.left, data);
    } else if (data > node.data) {
      node.right = this.delete(node.right, data);
    }

    // node with no children
    if (node.left === null && node.right === null) return null;

    // node with one child
    if (node.left === null) return node.right;
    if (node.right === null) return node.left;

    // node with 2 children
    // replace current node with in-order successor
    node.data = this.findMinNode(node);
    // delete in-order successor from the right subtree
    node.right = this.delete(node.right, node.data);

    return node;
  }

  // find inorder successor
  findMinNode(node) {
    let currentNode = node.right;
    while (currentNode && currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  // returns node with given value
  find(data, node = this.root) {
    if (node === null) return 'Data not found';

    if (data < node.data) return this.find(data, node.left);
    if (data > node.data) return this.find(data, node.right);

    return node;
  }

  // level order traversal
  levelOrder(func = null) {
    if (this.root === null) return;

    const queue = [];
    const result = [];
    queue.push(this.root);

    // while queue is not empty keep looping
    while (queue.length !== 0) {
      // take out node from front of queue
      const frontNode = queue.shift();

      if (func) {
        func(frontNode); // If a function was provided, call it on the node
      } else {
        result.push(frontNode.data); // If no function was provided, push node value into result array
      }

      // enqueue its children
      if (frontNode.left !== null) queue.push(frontNode.left);
      if (frontNode.right !== null) queue.push(frontNode.right);
    }

    return func ? null : result;
  }

  // inorder traversal
  inorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    this.inorder(func, node.left, result); // traverse left subtree
    func ? func(node) : result.push(node.data);
    this.inorder(func, node.right, result); // traverse right subtree

    return result;
  }

  // preorder traversal
  preorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    func ? func(node) : result.push(node.data);
    this.preorder(func, node.left, result);
    this.preorder(func, node.right, result);

    return result;
  }

  // postorder traversal
  postorder(func = null, node = this.root, result = []) {
    if (node === null) return result;

    this.postorder(func, node.left, result);
    this.postorder(func, node.right, result);
    func ? func(node) : result.push(node.data);

    return result;
  }

  // returns height
  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // calculate depth as number of edges from root until given node
  depth(data, node = this.root) {
    if (node === null) return 'Data not found';
    if (node.data === data) return 0;
    if (data > node.data) return this.depth(data, node.right) + 1;
    if (data < node.data) return this.depth(data, node.left) + 1;
  }

  // check if the height of the left and right subtree of any node differs by more than 1
  isBalanced(node = this.root) {
    // an empty tree is balanced
    if (node === null) return true;

    const leftSubtree = this.height(node.left);
    const rightSubtree = this.height(node.right);

    const difference = Math.abs(leftSubtree - rightSubtree);
    if (difference > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    return (this.root = this.buildTree(this.inorder()));
  }
}

export default Tree;
