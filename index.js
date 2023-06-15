import Tree from './tree.js';

// tests

// displays tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// generate random array with numbers over 100
function generateRandomArr(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

// insert n amount of numbers over 100 into tree
function addNumbers(tree, n) {
  for (let i = 0; i < n; i++) {
    tree.insert(Math.floor(Math.random() * 900) + 100);
  }
}

// 1. Create a binary search tree from an array of random numbers < 100
const tree = new Tree(generateRandomArr(7));
prettyPrint(tree.root);

// 2. Confirm that the tree is balanced by calling isBalanced
console.log(`Is tree balanced?: ${tree.isBalanced()}`); // true

// 3. Print out all elements in level, pre, post, and in order.
// breath-first traversal
console.log(`Level order: ${tree.levelOrder()}`);

// depth-first traversal
console.log(`Inorder: ${tree.inorder()}`); // inorder method
console.log(`Preorder: ${tree.preorder()}`); // preorder method
console.log(`Postorder: ${tree.postorder()}`); // postorder method

// 4. Add several random numbers > 100 to the array to unbalance it
addNumbers(tree, 10);
prettyPrint(tree.root);
console.log(`Is tree balanced?: ${tree.isBalanced()}`); // false

// 5. Balance the tree by calling rebalance
tree.rebalance();
prettyPrint(tree.root);

// 6. Confirm that the tree is balanced by calling isBalanced
console.log(`Is tree balanced?: ${tree.isBalanced()}`); // true

// 7. Print out all elements in level, pre, post, and in order
// breath-first traversal
console.log(`Level order: ${tree.levelOrder()}`);

// depth-first traversal
console.log(`Inorder: ${tree.inorder()}`); // inorder method
console.log(`Preorder: ${tree.preorder()}`); // preorder method
console.log(`Postorder: ${tree.postorder()}`); // postorder method
