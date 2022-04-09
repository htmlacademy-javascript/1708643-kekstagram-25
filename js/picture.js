import {arrayPhoto} from './photo.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a.picture');

const createPicture = (photoData) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photoData.url;
  picture.querySelector('.picture__comments').innerText = photoData.comments.length;
  picture.querySelector('.picture__likes').innerText = photoData.likes;
  return picture;
};

const createPictures = (photoArray) => {
  const fragment = document.createDocumentFragment();
  photoArray.forEach((picture) => fragment.appendChild(createPicture(picture)));
  return pictureContainer.appendChild(fragment);
};

const createPicturesArray = createPictures(arrayPhoto);

/* eslint-disable no-console */
console.log(createPicturesArray);

export {createPictures, createPicturesArray};
