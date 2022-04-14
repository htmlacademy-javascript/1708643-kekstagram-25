import {isEscEvent} from './util.js';
import {descriptionInput, hashtagsInput, onDescriptionInput, onHashtagInput} from './form.js';
import {imgPreview, scaleValue, sliderBlockNone, lowerSizeImg, incrementSizeImg} from './effect.js';
import {CONTROL_MAX_VALUE} from './const.js';

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const modalCloseButton = document.querySelector('#upload-cancel');
const hideClass = 'hidden';

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const closeUploadFileModal = () => {
  imgUploadOverlay.classList.add(hideClass);
  body.classList.remove('modal-open');

  hashtagsInput.value = '';
  descriptionInput.value = '';

  scaleValue.value = `${CONTROL_MAX_VALUE  }%`;
  imgPreview.style = '';
  imgPreview.style.filter = 'none';
  sliderBlockNone.style.display = 'none';

  hashtagsInput.removeEventListener('input', onHashtagInput);
  descriptionInput.removeEventListener('input', onDescriptionInput);
  scaleSmaller.removeEventListener('click', lowerSizeImg);
  scaleBigger.removeEventListener('click', incrementSizeImg);
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

  scaleSmaller.addEventListener('click', lowerSizeImg);
  scaleBigger.addEventListener('click', incrementSizeImg);

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
};

const openUploadFile = () => {
  fileInput.addEventListener('change', onFileInputChange);
};

openUploadFile();

export {onModalCloseButtonClick};
