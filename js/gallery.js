import {openPictureModal} from './big-picture.js';
import {isEnterEvent} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a.picture');

const createPicture = (photoData) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.dataset.photoId = photoData.id;
  picture.querySelector('.picture__img').src = photoData.url;
  picture.querySelector('.picture__comments').innerText = photoData.comments.length;
  picture.querySelector('.picture__likes').innerText = photoData.likes;
  return picture;
};

const clearPictures = () => {
  const pictures = pictureContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const onPictureClick = (evt) => {
  evt.preventDefault();
  openPictureModal(evt);
};

const onPictureEnterPress = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    openPictureModal(evt);
  }
};

const setPicturesViewed = () => {
  const pictures = document.querySelectorAll('a.picture');
  pictures.forEach((element) => element.addEventListener('click', onPictureClick));
  pictures.forEach((element) => element.addEventListener('keydown', onPictureEnterPress));
};

const renderPictures = (photosData) => {
  const fragment = document.createDocumentFragment();
  photosData.forEach((element) => fragment.appendChild(createPicture(element)));
  clearPictures();
  pictureContainer.appendChild(fragment);
  setPicturesViewed();
};

export {renderPictures};
