import {MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT} from './const.js';

// имя_функции(от, до);  // Результат: целое число из диапазона "от...до"
const getRandomInt = (min, max) => {
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
};
//getRandomInt(10, 22);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const messageCount = getRandomInt(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT);

// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
// eslint-disable-next-line no-unused-vars
const checkMaxStringLength = (checkString, maxLength) => {
  const stringLength = checkString.length;
  return stringLength <= maxLength;
};
//checkMaxStringLength('random', 140);

const getUniqueNum = (min, max, array) => {
  const uniqueNum = getRandomInt(min, max);
  if ( array.length < (max - min + 1) ) {
    if (array.includes(uniqueNum)) {
      array = getUniqueNum(min, max, array);
    } else {
      array.push(uniqueNum);
    }
  }
  return array;
};

const getIntValue = (element) => {
  const valueString = element.value;
  return window.parseInt(valueString);
};

const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

const isEnterEvent = (evt) => evt.key === 'Enter';

export {
  getRandomInt,
  getRandomArrayElement,
  messageCount,
  getUniqueNum,
  getIntValue,
  isEscEvent,
  isEnterEvent,
  checkMaxStringLength
};
