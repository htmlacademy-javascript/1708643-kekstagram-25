import {isEscEvent} from './util.js';
import {descriptionInput, hashtagsInput, onDescriptionInput, onHashtagInput} from './form.js';

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const modalCloseButton = document.querySelector('#upload-cancel');
const hideClass = 'hidden';

const closeUploadModal = () => {
  imgUploadOverlay.classList.add(hideClass);
  body.classList.remove('modal-open');

  modalCloseButton.removeEventListener('click', closeUploadModal);

  hashtagsInput.removeEventListener('input', onHashtagInput);
  descriptionInput.removeEventListener('input', onDescriptionInput);

  fileInput.value = '';
};

const onUploadModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    const isHashtagsInputNotFocus = hashtagsInput !== document.activeElement;
    const isDescriptionInputNotFocus = descriptionInput !== document.activeElement;
    evt.preventDefault();
    if (isHashtagsInputNotFocus && isDescriptionInputNotFocus) {
      closeUploadModal();
      document.removeEventListener('keydown', onUploadModalEscPress);
    }
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove(hideClass);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', closeUploadModal);
};

const openUploadFile = () => {
  fileInput.addEventListener('click', openUploadModal);
};

openUploadFile();

export {closeUploadModal};
