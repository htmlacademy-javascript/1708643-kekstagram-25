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
//getRandomInt(10, 22);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
// eslint-disable-next-line no-unused-vars
function checkMaxStringLength(checkString, maxLength) {
  const stringLength = checkString.length;
  return stringLength <= maxLength;
}
//checkMaxStringLength('random', 140);

const PHOTO_COUNT = 25;

const DESCRIPTION = [
  'Моя первая фотография',
  'Лучший кадр',
  'Перед рассветом',
  'В понедельник утром',
  'Сон наяву',
  'Лучшие воспоминания',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MIN_MESSAGE_COUNT = 1;
const MAX_MESSAGE_COUNT = 2;
const messageCount = getRandomInt(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT);

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

const NAMES = [
  'Инна',
  'Иван',
  'Павел',
  'Мария',
  'Егор',
  'Виктор',
  'Юлия',
  'Анна',
  'Тихон',
];

let uniquePhotoId = [];
let uniqueCommentsId = [];
let uniquePictureUrl = [];
const getUniqueNum = function (min, max, array) {
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

const createPhoto = function () {
  uniquePhotoId = getUniqueNum(1,25,uniquePhotoId);
  uniquePictureUrl = getUniqueNum(1,25,uniquePictureUrl);
  return {
    id: uniquePhotoId.at(-1),
    url: `photos/${  uniquePictureUrl.at(-1)  }.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInt(15, 200),
    comments: getRandomArrayElement(commentsArray),
  };
};
// eslint-disable-next-line no-unused-vars
const arrayPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);

//console.log(arrayPhoto);
