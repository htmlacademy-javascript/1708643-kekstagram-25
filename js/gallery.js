import {showModal} from './big-picture.js';
import {createPicture, pictureContainerElement} from './picture.js';

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
  pictureContainerElement.appendChild(fragment);
};

export {renderPictures};
