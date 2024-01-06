// ========================== Approach 1 ============================

function helper(root, start, end, leaves, foundStart, foundEnd) {
  if (root === null) return [foundStart, foundEnd];

  foundStart = foundStart || root === start;
  foundEnd = foundEnd || root === end;

  if (root.children.length === 0) {
    if (root === start) {
      foundStart = true;
    }

    if (foundStart) leaves.push(root);
  }

  for (let node of root.children) {
    [foundStart, foundEnd] = helper(
      node,
      start,
      end,
      leaves,
      foundStart,
      foundEnd
    );
    if (foundEnd === true) break;
  }

  return [foundStart, foundEnd];
}

function findLeavesInBetween1(root, start, end) {
  const leaves = [];
  helper(root, start, end, leaves, false);
  return leaves;
}

// ========================== Approach 2 ============================

function findLeavesInBetween2(root, start, end) {
  const leaves = [];
  let foundStart = false;
  let foundEnd = false;

  function helper(root) {
    if (root == null) {
      return;
    }

    foundStart = foundStart || root == start;
    foundEnd = foundEnd || root == end;

    if (root.children.length == 0) {
      if (foundStart) {
        leaves.push(root);
      }
    }

    for (let child of root.children) {
      helper(child);
      if (foundEnd) {
        break;
      }
    }
  }

  helper(root);
  return leaves;
}

// ========================== Testcase ============================

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

// Function to build a sample n-ary tree
const root = new TreeNode(1);

// Level 1
const child1 = new TreeNode(2);
const child2 = new TreeNode(3);
const child3 = new TreeNode(4);

root.addChild(child1);
root.addChild(child2);
root.addChild(child3);

// Level 2
const child4 = new TreeNode(5);
const child5 = new TreeNode(6);
const child6 = new TreeNode(7);

child1.addChild(child4);
child1.addChild(child5);
child1.addChild(child6);

const child7 = new TreeNode(8);
const child8 = new TreeNode(9);
const child9 = new TreeNode(10);

child2.addChild(child7);
child2.addChild(child8);
child2.addChild(child9);

const child10 = new TreeNode(11);
const child11 = new TreeNode(12);
const child12 = new TreeNode(13);

child3.addChild(child10);
child3.addChild(child11);
child3.addChild(child12);

// Level 3
const child13 = new TreeNode(14);
const child14 = new TreeNode(15);
const child15 = new TreeNode(16);

child4.addChild(child13);
child4.addChild(child14);
child4.addChild(child15);

const child16 = new TreeNode(17);
const child17 = new TreeNode(18);
const child18 = new TreeNode(19);

child7.addChild(child16);
child7.addChild(child17);
child7.addChild(child18);

const child19 = new TreeNode(20);
const child20 = new TreeNode(21);
const child21 = new TreeNode(22);

child10.addChild(child19);
child10.addChild(child20);
child10.addChild(child21);

console.log(findLeavesInBetween2(root, child13, child15)); // 14 15 16
console.log(findLeavesInBetween1(root, child13, child15)); // 14 15 16
console.log(findLeavesInBetween2(root, child13, child21)); // 14, 15, 16, 6, 7, 17, 18, 19, 9, 10, 20, 21, 22
console.log(findLeavesInBetween1(root, child13, child21)); // 14, 15, 16, 6, 7, 17, 18, 19, 9, 10, 20, 21, 22
