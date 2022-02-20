// имя_функции(от, до);  // Результат: целое число из диапазона "от...до"
// function getRandomInt(min, max) {
//   if (min >= 0 && max >= 0 && min < max) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   } else {
//     alert ('диапазон может быть только положительным или 0, причем min < max');
//   }
// }
function getRandomInt(min, max) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      const realMax = min;
      min = max;
      max = realMax;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return 'Error!';
}

getRandomInt(10, 22);


// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
function checkMaxStringLength(checkString, maxLength) {
  const stringLength = checkString.length;
  if (stringLength <= maxLength) {
    return true;
  } else {
    return false;
  }
}

checkMaxStringLength('random', 140);
