import {checkMaxStringLength, isEscEvent} from './util.js';
import {HASHTAGS_DELIMITER, HASHTAGS_MAX_COUNT, DESCRIPTION_MAX_LENGTH} from './const.js';
import {sendData} from './api.js';
import {onModalCloseButtonClick} from './preview';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const uploadSubmit = document.querySelector('.img-upload__submit');
const uploadSuccessTemplate = document.querySelector('#success').content;
const uploadSuccessElement = uploadSuccessTemplate.querySelector('section');
const uploadSuccessButton = uploadSuccessElement.querySelector('.success__button');
const uploadErrorTemplate = document.querySelector('#error').content;
const uploadErrorElement = uploadErrorTemplate.querySelector('section');
const uploadErrorButton = uploadErrorElement.querySelector('.error__button');
const successSection = document.querySelector('.success');
const errorSection = document.querySelector('.error');

const isAllArrStrElemUniq = (arr) => {
  const arrLowerCase = arr.map((element) => element.toLowerCase());
  const unique = new Set(arrLowerCase);
  return arr.length === unique.size;
};

const isHashtag = (word) => {
  const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return hashtagRegex.test(word);
};

const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_DELIMITER);
  const hashtagArr = hashtags.filter((elem) => Boolean(elem.length));
  const hashtagCount = hashtagArr.length;
  const hashtagCountError = hashtagCount > HASHTAGS_MAX_COUNT;
  const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
  const hashtagUniqError = !isAllArrStrElemUniq(hashtagArr);

  if (hashtagCountError) {
    evt.target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else if (hashtagError) {
    evt.target.setCustomValidity('неверный хештег');
  } else if (hashtagUniqError) {
    evt.target.setCustomValidity('хэш-тег не может быть использован дважды');
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
};

const onDescriptionInput = (evt) => {
  if (!checkMaxStringLength(evt.target.value, DESCRIPTION_MAX_LENGTH)) {
    evt.target.setCustomValidity('комментарий не может быть больше 140 символов');
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
};

const onModalEscPress = (evt, closeUploadSection) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadSection();
    document.addEventListener('keyup', onModalEscPress);
  }
};

const closeUploadSuccessSection = () => {
  document.body.removeChild(uploadSuccessElement);
  document.removeEventListener('keyup', onModalEscPress(closeUploadSuccessSection));

  uploadSuccessButton.removeEventListener('click', closeUploadSuccessSection);
  successSection.removeEventListener('click', closeUploadSuccessSection);
};

const showUploadSuccessSection = () => {
  document.body.appendChild(uploadSuccessElement);

  uploadSuccessButton.addEventListener('click', closeUploadSuccessSection);

  document.addEventListener('keyup', onModalEscPress(closeUploadSuccessSection));
  successSection.addEventListener('click', closeUploadSuccessSection);
};

const closeUploadErrorSection = () => {
  document.body.removeChild(uploadErrorElement);
  document.removeEventListener('keyup', onModalEscPress(closeUploadErrorSection));

  uploadErrorButton.removeEventListener('click', closeUploadErrorSection);
  errorSection.removeEventListener('click', closeUploadErrorSection);
};

const showUploadErrorSection = () => {
  document.body.appendChild(uploadErrorElement);

  uploadErrorButton.addEventListener('click', closeUploadErrorSection);

  document.addEventListener('keyup', onModalEscPress(closeUploadErrorSection));
  errorSection.addEventListener('click', closeUploadErrorSection);
};

const setSubmitButtonState = (isBlocked) => {
  uploadSubmit.disabled = isBlocked;
  uploadSubmit.textContent = isBlocked ? 'Публикую...' : 'Опубликовать';
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  setSubmitButtonState(true);
  const formData = new FormData(form);

  sendData(
    formData,
    () => {
      onModalCloseButtonClick();
      setSubmitButtonState(false);
      showUploadSuccessSection();
    },
    () => {
      onModalCloseButtonClick();
      setSubmitButtonState(false);
      showUploadErrorSection();
    }
  );
};

const setFormSubmit = () => {
  form.addEventListener('submit', handleSubmit);
};

export {
  hashtagsInput,
  descriptionInput,
  onHashtagInput,
  onDescriptionInput,
  setFormSubmit
};
