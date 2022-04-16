// import {getUniqueNum, getRandomInt, getRandomArrayElement} from './util.js';
// import {DESCRIPTION} from './data.js';
// import {PHOTO_COUNT} from './const.js';
// import {commentsArray} from './message.js';

// let uniquePhotoId = [];
// let uniquePictureUrl = [];

// const createPhoto = function () {
//   uniquePhotoId = getUniqueNum(1,25,uniquePhotoId);
//   uniquePictureUrl = getUniqueNum(1,25,uniquePictureUrl);
//   return {
//     id: uniquePhotoId.at(-1),
//     url: `photos/${  uniquePictureUrl.at(-1)  }.jpg`,
//     description: getRandomArrayElement(DESCRIPTION),
//     likes: getRandomInt(15, 200),
//     comments: commentsArray,
//   };
// };

// const arrayPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);

// export {arrayPhoto};
