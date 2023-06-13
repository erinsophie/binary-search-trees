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
}

export default Tree 