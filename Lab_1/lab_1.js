const { PerformanceObserver, performance } = require('perf_hooks');

function matrixArray(rows, columns) {
  let arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < columns; j++) {
      arr[i][j] = Math.floor(Math.random() * 100);
    }
  }
  return arr;
}

//ShellSort
const shellSort = (arr) => {
  let n = arr.length,
    i = Math.floor(n / 2);
  while (i > 0) {
    for (let j = 0; j < n; j++) {
      let k = j,
        t = arr[j];
      while (k >= i && arr[k - i] > t) {
        arr[k] = arr[k - i];
        k -= i;
      }
      arr[k] = t;
    }
    i = i == 2 ? 1 : Math.floor((i * 5) / 11);
  }
  return arr;
};

//Quick Sort
const quickSort = (arr, left, right) => {
  let pivot;
  let partitionIndex;

  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);

    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
};

const partition = (arr, pivot, left, right) => {
  let pivotValue = arr[pivot],
    partitionIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
};

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const compareNumbers = (a, b) => {
  return a - b;
};

let arr = matrixArray(100, 100);
arr2 = arr;
arr3 = arr;

//console.log('Изначальная матрица 100 100');

let time = performance.now(); //Начало отсчёта времени
arr.forEach((row) => row.sort(compareNumbers));
//console.log('Встроенная сортировка', arr);
time = performance.now() - time; //Конец отчёта времени
console.log('Время выполнения встроенной сортировки = ', time);

let time2 = performance.now();
arr2.forEach((row) => shellSort(row));
//console.log('Сортировка Шелла', arr2);
time2 = performance.now() - time2;
console.log('Время выполнения сортировки Шелла = ', time2);

let time3 = performance.now();
arr3.forEach((row) => quickSort(row, 0, 4));
//console.log('Быстрая сортировка', arr3);
time3 = performance.now() - time3;
console.log('Время выполнения quickSort = ', time3);
