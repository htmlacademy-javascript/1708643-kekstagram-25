import {checkMaxStringLength, isEscEvent} from './util.js';
import {HASHTAGS_DELIMITER, HASHTAGS_MAX_COUNT, DESCRIPTION_MAX_LENGTH} from './data.js';
// import {closeUploadModal} from './preview';

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form);

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const isAllArrStrElemUniq = (arr) => {
  const arrLowerCase = arr.map((element) => element.toLowerCase());
  const unique = new Set(arrLowerCase);
  return arr.length === unique.size;
};

const isHashtag = (word) => {
  const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  return hashtagRegex.test(word);
};

const onOpenModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const focusEscNoClose = (element) => {
  element.addEventListener('focus', onOpenModalEscPress);
};

const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_DELIMITER);
  const hashtagArr = hashtags.filter((elem) => Boolean(elem.length));
  const hashtagCount = hashtagArr.length;
  const hashtagCountError = hashtagCount > HASHTAGS_MAX_COUNT;
  const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
  const hashtagUniqError = !isAllArrStrElemUniq(hashtagArr);
  focusEscNoClose(hashtagsInput);

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
  focusEscNoClose(descriptionInput);
  if (!checkMaxStringLength(evt.target.value, DESCRIPTION_MAX_LENGTH)) {
    evt.target.setCustomValidity('комментарий не может быть больше 140 символов');
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  hashtagsInput,
  descriptionInput,
  onHashtagInput,
  onDescriptionInput
};
