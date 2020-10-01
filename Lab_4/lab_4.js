const fs = require('fs');
const { type } = require('os');

//Реализация стека
class Stack {
  constructor() {
    this._size = 0;
    this._storage = {};
    this.regroupArr = ['', '', ''];
  }
  //Добавить в стек
  push(data) {
    var size = ++this._size;
    this._storage[size] = data;
  }
  //Убрать исмвол из стека
  pop() {
    var size = this._size,
      deletedData;

    if (size) {
      deletedData = this._storage[size];

      delete this._storage[size];
      this._size--;

      return deletedData;
    }
  }
  //Разбиение стека по группам
  regroup() {
    while (this._size !== 0) {
      let char = this.pop();
      if (/^[а-яА-ЯёЁa-zA-Z]$/.test(char)) {
        this.regroupArr[0] += char;
      }
      if (/\d/.test(char)) {
        this.regroupArr[1] += char;
      }
      if (/^[^а-яА-ЯёЁa-zA-Z\d]$/.test(char)) {
        this.regroupArr[2] += char;
      }
    }
    return this.regroupArr;
  }
}
//Создание объекта стека
const myStack = new Stack();

// Получение из файла стринг и разбитие на массив букв
let str = fs
  .readFileSync(process.cwd() + '/' + 'textFile.txt')
  .toString()
  .split('');

//Цикл добавления в стек
for (let i = 0; i < str.length; i++) {
  myStack.push(str[i]);
  console.log('Сформированный стек', myStack);
}

let resultArr = myStack.regroup().join(' ');
// console.log('Перегрупированный из стека текст', resultArr);
console.log('Группировка стека', myStack);

//Запись в новый файл
fs.writeFileSync('resultFile.txt', resultArr);
