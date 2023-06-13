import Node from './node.js';

class Tree {
  constructor(arr) {
      // returns the root node of the tree
      this.root = this.buildTree(arr);
  }
  
  buildTree(arr) {
      arr = [...new Set(arr)].sort((a, b) => a - b);
      
      if(arr.length === 0) return null
      
      else {
       const mid = Math.floor(arr.length / 2)
       const node = new Node(arr[mid])
       
       node.left = this.buildTree(arr.slice(0, mid)) 
       node.right = this.buildTree(arr.slice(mid + 1, arr.length))
       
       return node
  }
}
  // inserts given value
  insert(node = this.root, value) {
    if (node === null) return new Node(value)

    if (value < node.value) {
        node.left = this.insert(node.left, value)
    } else if (value > node.value) {
        node.right = this.insert(node.right, value)
    }
    
    return node
  }

    // deletes given value 
    delete(node = this.root, value) {
      // base case
      if(node === null) return node
      
      if(value < node.value) {
          node.left = this.delete(node.left, value)
      } else if (value > node.value) {
          node.right = this.delete(node.right, value)
      }
      
      // node with no children
      if(node.left === null && node.right === null) return null
      
      // node with one child 
       if(node.left === null) return node.right
       if(node.right === null) return node.left
       
       // node with 2 children
       // replace current node with in-order successor
       node.value = this.findMinNode(node)
       // delete in-order successor from the right subtree
       node.right = this.delete(node.right, node.value)
       
       return node 
  }
  
// find in-order successor 
findMinNode(node) {
    let currentNode = node.right;
    while(currentNode && currentNode.left !== null) {
        currentNode = currentNode.left;
    }
    return currentNode.value; 
  }
}

export default Tree 