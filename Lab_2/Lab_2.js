const { PerformanceObserver, performance } = require('perf_hooks');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null; // корень bst
  }
  add(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.addNode(this.root, newNode);
    }
  }
  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNode(node.right, newNode);
      }
    }
  }
  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }
  minNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }
  remove(data) {
    this.root = this.removeNode(this.root, data);
  }
  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }
  inOrderTraverse(node, callback) {
    if (node != null) {
      this.inOrderTraverse(node.left, callback);
      callback(node.data);
      this.inOrderTraverse(node.right, callback);
    }
  }
}

//Создание объекта класса BST
const BST = new BinarySearchTree();

//Случайный массив из 20 чисел
let arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 100));
//console.log(arr); //Увидим какой массви

//Добавление чисел в бинарное дерево поиска
for (let i = 0; i <= arr.length; i++) {
  BST.add(arr[i]);
}

// let time = performance.now();
// console.log(BST.search(BST.root, 40));
// time = performance.now() - time;
// console.log('Время выполнения = ', time);

let time6 = performance.now();
console.log(arr.indexOf(40));
time6 = performance.now() - time6;
console.log('Время выполнения = ', time6);

// console.log(BST); //Выводим дерево
// console.log(BST.search(BST.root, 20)); //Поиск числа 20 по дереву
// console.log(BST.search(BST.root, 10));
// console.log(BST.search(BST.root, 32));
// BST.remove(20); //Удаляем число из дерева
// BST.remove(10);
// BST.remove(32);
// console.log(BST.search(BST.root, 20)); //Снова ищем в дереве
// console.log(BST.search(BST.root, 10));
// console.log(BST.search(BST.root, 32));
