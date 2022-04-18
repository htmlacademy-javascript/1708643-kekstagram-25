import {checkMaxStringLength} from './util.js';
import {HASHTAGS_DELIMITER, HASHTAGS_MAX_COUNT, DESCRIPTION_MAX_LENGTH} from './const.js';
import {sendData} from './api.js';
import {onModalCloseButtonClick} from './preview.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {POST_URL} from './data.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const uploadSubmit = document.querySelector('.img-upload__submit');

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

const setSubmitButtonState = (isBlocked) => {
  uploadSubmit.disabled = isBlocked;
  uploadSubmit.textContent = isBlocked ? 'Публикую...' : 'Опубликовать';
};

const onHandleSubmit = (evt) => {
  evt.preventDefault();
  setSubmitButtonState(true);
  const formData = new FormData(evt.target);

  sendData(
    POST_URL,
    formData,
    () => {
      onModalCloseButtonClick();
      setSubmitButtonState(false);
      showSuccessMessage();
    },
    () => {
      onModalCloseButtonClick();
      setSubmitButtonState(false);
      showErrorMessage();
    }
  );
};

const setFormSubmit = () => {
  form.addEventListener('submit', onHandleSubmit);
};

const unsetFormSubmit = () => {
  form.removeEventListener('submit', onHandleSubmit);
};

setFormSubmit();

export {
  hashtagsInput,
  descriptionInput,
  onHashtagInput,
  onDescriptionInput,
  setFormSubmit,
  unsetFormSubmit
};
