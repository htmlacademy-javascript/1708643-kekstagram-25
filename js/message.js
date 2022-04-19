import {isEscEvent} from './util.js';

const successMessageTemplateBlockElement = document.querySelector('#success');
const successMessageTemplateElement = successMessageTemplateBlockElement.content.querySelector('.success');
const errorMessageTemplateBlockElement = document.querySelector('#error');
const errorMessageTemplateElement = errorMessageTemplateBlockElement.content.querySelector('.error');
const mainElement = document.querySelector('main');

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
};

const onSuccessMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessMessageOverlayClick = (evt) => {
  const successMessage = document.querySelector('.success');
  if (evt.target === successMessage) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplateElement.cloneNode(true);
  mainElement.appendChild(successMessage);
  const successButtonElement = document.querySelector('.success__button');
  successButtonElement.addEventListener('click', closeSuccessMessage);
  successMessage.addEventListener('click', onSuccessMessageOverlayClick);
  document.addEventListener('keydown', onSuccessMessageEscPress);
};

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
};

const onErrorMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};
const onErrorMessageOverlayClick = (evt) => {
  const errorMessage = document.querySelector('.error');
  if (evt.target === errorMessage) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplateElement.cloneNode(true);
  mainElement.appendChild(errorMessage);
  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('click', closeErrorMessage);
  errorMessage.addEventListener('click', onErrorMessageOverlayClick);
  document.addEventListener('keydown', onErrorMessageEscPress);
};

export {showSuccessMessage, showErrorMessage};
