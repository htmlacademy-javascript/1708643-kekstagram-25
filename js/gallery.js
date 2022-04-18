import {showModal} from './big-picture.js';
import {createPicture, pictureContainer} from './picture.js';

// const clearPictures = () => {
//   const pictures = pictureContainer.querySelectorAll('.picture');
//   pictures.forEach((picture) => {
//     picture.remove();
//   });
// };

// const onPictureClick = (evt) => {
//   evt.preventDefault();
//   openPictureModal(evt);
// };

// const onPictureEnterPress = (evt) => {
//   if (isEnterEvent(evt)) {
//     evt.preventDefault();
//     openPictureModal(evt);
//   }
// };

// const setPicturesViewed = () => {
//   const pictures = document.querySelectorAll('a.picture');
//   pictures.forEach((element) => element.addEventListener('click', onPictureClick));
//   pictures.forEach((element) => element.addEventListener('keydown', onPictureEnterPress));
// };

const renderPictures = (photosData) => {
  const fragment = document.createDocumentFragment();
  photosData.forEach((photoData) => {
    const photoDataElement = createPicture(photoData);
    photoDataElement.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(photoData);
    });
    fragment.appendChild(photoDataElement);
  });
  pictureContainer.appendChild(fragment);
};

export {renderPictures};
