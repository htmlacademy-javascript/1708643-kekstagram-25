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

const MESSAGE_COUNT = getRandomInt(1, 2);

const PHOTO_MESSAGE = function () {
  if (MESSAGE_COUNT === 2) {
    return `${getRandomArrayElement(MESSAGE)  } ${  getRandomArrayElement(MESSAGE)}`;
  }
  return getRandomArrayElement(MESSAGE);
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

const COMMENTS = function () {
  return {
    id: getRandomInt(1, 25),
    avatar: `img/avatar-${  getRandomInt(1, 6)  }.svg`,
    message: PHOTO_MESSAGE(),
    name: getRandomArrayElement(NAMES),
  };
};
const commentsArray = Array.from({length: 14}, COMMENTS);

const createPhoto = () => ({
  id: getRandomInt(1, 25),
  url: `photos/${  getRandomInt(1, 25)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInt(15, 200),
  comments: getRandomArrayElement(commentsArray),
});
const arrayPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);

console.log(arrayPhoto);
