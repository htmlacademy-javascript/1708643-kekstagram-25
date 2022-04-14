import {isEscEvent} from './util.js';
import {descriptionInput, hashtagsInput, onDescriptionInput, onHashtagInput} from './form.js';

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const modalCloseButton = document.querySelector('#upload-cancel');
const hideClass = 'hidden';

const closeUploadFileModal = () => {
  imgUploadOverlay.classList.add(hideClass);
  body.classList.remove('modal-open');

  hashtagsInput.value = '';
  descriptionInput.value = '';

  hashtagsInput.removeEventListener('input', onHashtagInput);
  descriptionInput.removeEventListener('input', onDescriptionInput);
};

const onModalCloseButtonClick = () => {
  closeUploadFileModal();
  modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
};

const onUploadModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    const isHashtagsInputNotFocus = hashtagsInput !== document.activeElement;
    const isDescriptionInputNotFocus = descriptionInput !== document.activeElement;
    evt.preventDefault();
    if (isHashtagsInputNotFocus && isDescriptionInputNotFocus) {
      closeUploadFileModal();
      document.addEventListener('keydown', onUploadModalEscPress);
    }
  }
};

const onFileInputChange = () => {
  imgUploadOverlay.classList.remove(hideClass);
  body.classList.add('modal-open');

  hashtagsInput.addEventListener('input', onHashtagInput);
  descriptionInput.addEventListener('input', onDescriptionInput);

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
};

const openUploadFile = () => {
  fileInput.addEventListener('change', onFileInputChange);
};

openUploadFile();

export {onModalCloseButtonClick};