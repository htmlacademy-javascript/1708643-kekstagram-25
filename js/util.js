import {MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT, ALERT_SHOW_TIME} from './const.js';

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

const showAlert = (message, showTime = ALERT_SHOW_TIME) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, showTime);
};

let timeoutId;

const debounce = (callback, timeoutDelay = 500) => (...rest) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
};

export {
  getRandomInt,
  getRandomArrayElement,
  messageCount,
  getUniqueNum,
  getIntValue,
  isEscEvent,
  isEnterEvent,
  checkMaxStringLength,
  showAlert,
  debounce
};
