// имя_функции(от, до);  // Результат: целое число из диапазона "от...до"
function getRandomInt(min, max) {
  if (min >= 0 && max >= 0) {
    if (min > max) {
      const realMax = min;
      min = max;
      max = realMax;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
}

getRandomInt(10, 22);


// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
function checkMaxStringLength(checkString, maxLength) {
  const stringLength = checkString.length;
  return stringLength <= maxLength;
}

checkMaxStringLength('random', 140);
