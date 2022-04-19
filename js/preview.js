import {isEscEvent} from './util.js';
import {descriptionInput, hashtagsInput, onDescriptionInput, onHashtagInput} from './form.js';
import {imgPreview, scaleValue, sliderBlockNoneElement, lowerSizeImg, incrementSizeImg} from './effect.js';
import {CONTROL_MAX_VALUE, EFFECT_CLASS_START, CONTROL_DEFAULT_VALUE} from './const.js';

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const modalCloseButton = document.querySelector('#upload-cancel');
const hideClass = 'hidden';
const formElement = document.querySelector('.img-upload__form');

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const effectNone = document.querySelector('#effect-none');
const valueEffectLevel = document.querySelector('.effect-level__value');

const closeUploadFileModal = () => {
  imgUploadOverlayElement.classList.add(hideClass);
  bodyElement.classList.remove('modal-open');

  hashtagsInput.value = '';
  descriptionInput.value = '';

  scaleValue.value = `${CONTROL_MAX_VALUE  }%`;
  imgPreview.style = '';
  imgPreview.style.filter = 'none';
  sliderBlockNoneElement.style.display = 'none';
  imgPreview.classList.value = `${EFFECT_CLASS_START  }none`;
  effectNone.checked = true;
  valueEffectLevel.value = CONTROL_DEFAULT_VALUE;
  formElement.reset();

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
  imgUploadOverlayElement.classList.remove(hideClass);
  bodyElement.classList.add('modal-open');

  imgPreview.src = URL.createObjectURL(fileInput.files[0]);

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

export {onModalCloseButtonClick, openUploadFile};
