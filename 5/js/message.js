import {getRandomInt, getRandomArrayElement, messageCount, getUniqueNum} from './util.js';
import {MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT, MESSAGE, NAMES} from './data.js';

const getPhotoMessage = function () {
  let arrayMessage = '';
  if (MIN_MESSAGE_COUNT === 0 && MAX_MESSAGE_COUNT === 0) {
    return '';
  }
  for (let i = 0; i <= messageCount; i++) {
    arrayMessage += `${getRandomArrayElement(MESSAGE)  } `;
  }
  return arrayMessage.trimEnd();
};

let uniqueCommentsId = [];
const comments = function () {
  uniqueCommentsId = getUniqueNum(1,25,uniqueCommentsId);
  return {
    id: uniqueCommentsId.at(-1),
    avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
    message: getPhotoMessage(),
    name: getRandomArrayElement(NAMES),
  };
};
const commentsArray = Array.from({length: 14}, comments);

export {getPhotoMessage, commentsArray};
