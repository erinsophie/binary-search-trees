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
const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(tree.root);
tree.delete(6);
tree.delete(7);
prettyPrint(tree.root);
