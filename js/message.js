import {isEscEvent} from './util.js';

const successMessageTemplateBlockElement = document.querySelector('#success');
const successMessageTemplateElement = successMessageTemplateBlockElement.content.querySelector('.success');
const errorMessageTemplateBlockElement = document.querySelector('#error');
const errorMessageTemplateElement = errorMessageTemplateBlockElement.content.querySelector('.error');
const mainElement = document.querySelector('main');

const closeSuccessMessage = () => {
  const successMessageElement = document.querySelector('.success');
  if (successMessageElement) {
    successMessageElement.remove();
  }
};

const onSuccessMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessMessageOverlayClick = (evt) => {
  const successMessageElement = document.querySelector('.success');
  if (evt.target === successMessageElement) {
    closeSuccessMessage();
  }
};

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplateElement.cloneNode(true);
  mainElement.appendChild(successMessageElement);
  const successButtonElement = document.querySelector('.success__button');
  successButtonElement.addEventListener('click', closeSuccessMessage);
  successMessageElement.addEventListener('click', onSuccessMessageOverlayClick);
  document.addEventListener('keydown', onSuccessMessageEscPress);
};

const closeErrorMessage = () => {
  const errorMessageElement = document.querySelector('.error');
  errorMessageElement.remove();
};

const onErrorMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};
const onErrorMessageOverlayClick = (evt) => {
  const errorMessageElement = document.querySelector('.error');
  if (evt.target === errorMessageElement) {
    closeErrorMessage();
  }
};

const showErrorMessage = () => {
  const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
  mainElement.appendChild(errorMessageElement);
  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('click', closeErrorMessage);
  errorMessageElement.addEventListener('click', onErrorMessageOverlayClick);
  document.addEventListener('keydown', onErrorMessageEscPress);
};

export {showSuccessMessage, showErrorMessage};
