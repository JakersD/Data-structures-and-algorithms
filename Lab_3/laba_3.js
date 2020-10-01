const readline = require('readline');
const { PerformanceObserver, performance } = require('perf_hooks');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Введите строку ', (str) => {
  rl.question('Введите строку для поиска ', (target) => {
    rl.question('Игнорировать регистр? Y/N ', (yesNo) => {
      let isLowerCase = false;
      if (yesNo === 'Y') {
        isLowerCase = true;
      }
      let time = performance.now();
      KMP(target, str, isLowerCase);
      time = performance.now() - time;
      console.log('Время выполнения = ', time);
      rl.close;
    });
  });
});

function KMP(target, str, isLowerCase) {
  if (isLowerCase) {
    newStr = str.toLowerCase();
    newTarget = target.toLowerCase();
  } else {
    newStr = str;
    newTarget = target;
  }
  let m = 0,
    i = 0,
    table = [],
    pos = 2,
    cnd = 0;

  table[0] = -1;
  table[1] = 0;

  while (pos < newTarget.length) {
    if (newTarget[pos - 1] == newTarget[cnd]) {
      cnd = cnd + 1;
      table[pos] = cnd;
      pos = pos + 1;
    } else if (cnd > 0) {
      cnd = table[cnd];
    } else {
      table[pos] = 0;
      pos = pos + 1;
    }
  }
  while (m + i < newStr.length) {
    if (newTarget[i] == newStr[m + i]) {
      if (i == newTarget.length - 1) {
        return m;
      }
      i = i + 1;
    } else {
      if (table[i] > -1) {
        m = m + i - table[i];
        i = table[i];
      } else {
        i = 0;
        m = m + 1;
      }
    }
  }
  return -1;
}
