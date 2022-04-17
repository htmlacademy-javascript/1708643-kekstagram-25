import {openPictureModal} from './big-picture.js';
import {isEnterEvent} from './util.js';
import {createPicture, pictureContainer} from './picture.js';

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
