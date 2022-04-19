import {isEscEvent} from './util.js';
import {descriptionInput, hashtagsInput, onDescriptionInput, onHashtagInput} from './form.js';
import {imgPreview, scaleValue, sliderBlockNoneElement, lowerSizeImg, incrementSizeImg} from './effect.js';
import {CONTROL_MAX_VALUE, EFFECT_CLASS_START, CONTROL_DEFAULT_VALUE} from './const.js';

const fileInputElement = document.querySelector('#upload-file');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const modalCloseButtonElement = document.querySelector('#upload-cancel');
const hideClass = 'hidden';
const formElement = document.querySelector('.img-upload__form');

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');

const effectNoneElement = document.querySelector('#effect-none');
const valueEffectLevelElement = document.querySelector('.effect-level__value');

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
  effectNoneElement.checked = true;
  valueEffectLevelElement.value = CONTROL_DEFAULT_VALUE;
  formElement.reset();

  hashtagsInput.removeEventListener('input', onHashtagInput);
  descriptionInput.removeEventListener('input', onDescriptionInput);
  scaleSmallerElement.removeEventListener('click', lowerSizeImg);
  scaleBiggerElement.removeEventListener('click', incrementSizeImg);
};

const onModalCloseButtonClick = () => {
  closeUploadFileModal();
  modalCloseButtonElement.removeEventListener('click', onModalCloseButtonClick);
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

  imgPreview.src = URL.createObjectURL(fileInputElement.files[0]);

  hashtagsInput.addEventListener('input', onHashtagInput);
  descriptionInput.addEventListener('input', onDescriptionInput);

  scaleSmallerElement.addEventListener('click', lowerSizeImg);
  scaleBiggerElement.addEventListener('click', incrementSizeImg);

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButtonElement.addEventListener('click', onModalCloseButtonClick);
};

const openUploadFile = () => {
  fileInputElement.addEventListener('change', onFileInputChange);
};

export {onModalCloseButtonClick, openUploadFile};
