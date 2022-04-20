import {ALERT_SHOW_TIME, FILTER_CHANGE_DEBOUNCE_TIME} from './const.js';

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

const checkMaxStringLength = (checkString, maxLength) => {
  const stringLength = checkString.length;
  return stringLength <= maxLength;
};

const getIntValue = (element) => {
  const valueString = element.value;
  return window.parseInt(valueString);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message, showTime = ALERT_SHOW_TIME) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
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

const debounce = (callback, timeoutDelay = FILTER_CHANGE_DEBOUNCE_TIME) => (...rest) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
};

export {
  getRandomInt,
  getIntValue,
  isEscEvent,
  checkMaxStringLength,
  showAlert,
  debounce
};
