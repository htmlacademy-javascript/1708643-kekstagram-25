import {isEscEvent, getRandomInt, showAlert, debounce} from './util.js';
import {COMMENTS_TO_SHOW_COUNT, FILTER_CHANGE_DEBOUNCE_TIME, MAX_RANDOM_PHOTOS, DOWNLOAD_ERROR_MESSAGE} from './const.js';
import {getData} from './api.js';
import {openUploadFile} from './preview.js';
import {renderPictures} from './gallery.js';

const fragment = document.createDocumentFragment();
const picturesWrapperElement = document.querySelector('.pictures');
const bigPictureBlockElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureBlockElement.querySelector('.big-picture__img img');
const bigPictureLikesElement = bigPictureBlockElement.querySelector('.likes-count');
const bigPictureCommentsCountElement = bigPictureBlockElement.querySelector('.comments-count');
const bigPictureCommentsBlockElement = bigPictureBlockElement.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPictureBlockElement.querySelector('.social__caption');
const bigPictureCommentsLoaderElement = bigPictureBlockElement.querySelector('.comments-loader');
const bigPictureCommentsShowCountElement = bigPictureBlockElement.querySelector('.comments-show-count');
const bigPictureSocialCommentsCountElement = bigPictureBlockElement.querySelector('.social__comment-count');
const bodyElement = document.querySelector('body');
const bigPictureCancelElement = bigPictureBlockElement.querySelector('.big-picture__cancel');
const imgFiltersElement = document.querySelector('.img-filters');
const imgFiltersFormElement = document.querySelector('.img-filters__form');
const filterDefaultButtonElement = imgFiltersFormElement.querySelector('#filter-default');
const filterRandomButtonElement = imgFiltersFormElement.querySelector('#filter-random');
const filterDiscussedButtonElement = imgFiltersFormElement.querySelector('#filter-discussed');
const templateElement = document.createElement('template');

const commentTemplateString = `
  <li class="social__comment">
    <img
      class="social__picture"
      src=""
      alt=""
      width="35" height="35">
    <p class="social__text"></p>
  </li>`;

templateElement.innerHTML = commentTemplateString;

const templateCommentElement = templateElement.content.querySelector('.social__comment');

const createComment = (comment) => {
  const commentElement = templateCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').innerText = comment.message;
  return commentElement;
};

let photoShowStep = 1;
let currentComments = [];

const createComments = (currentData) => {
  bigPictureCommentsCountElement.textContent = currentData.length;
  currentData
    .slice(0, photoShowStep * COMMENTS_TO_SHOW_COUNT)
    .forEach((comment) => {
      fragment.appendChild(createComment(comment));
    });
  bigPictureCommentsBlockElement.innerHTML = '';
  bigPictureCommentsBlockElement.appendChild(fragment);
};

const onCommentShowMore = () => {
  photoShowStep++;
  let currentCommentCount = COMMENTS_TO_SHOW_COUNT;
  if (photoShowStep * currentCommentCount >= currentComments.length) {
    bigPictureCommentsLoaderElement.classList.add('hidden');
    bigPictureCommentsShowCountElement.innerText = currentComments.length;
  } else {
    currentCommentCount *= photoShowStep;
    bigPictureCommentsShowCountElement.innerText = currentCommentCount;
  }
  createComments(currentComments);
};

const closePictureModal = () => {
  bigPictureBlockElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  bigPictureCommentsLoaderElement.classList.remove('hidden');
  bigPictureSocialCommentsCountElement.classList.remove('hidden');
  photoShowStep = 1;
};

const onModalCancelButtonClick = () => {
  closePictureModal();
  bigPictureCancelElement.removeEventListener('click', onModalCancelButtonClick);
};

const onPictureModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
    document.removeEventListener('keydown', onPictureModalEscPress);
  }
};

const createPictureModalData = (data) => {
  bigPictureImageElement.src = data.url;
  bigPictureLikesElement.textContent = data.likes;
  bigPictureDescriptionElement.textContent = data.description;
  createComments(data.comments);
};

const removePhotoContent = () => {
  const picturesElement = picturesWrapperElement.querySelectorAll('.picture');
  picturesElement.forEach((picture) => {
    picture.remove();
  });
};

let uploadedPhotos = {};

document.addEventListener('DOMContentLoaded', () => {
  getData(
    (photoContent) => {
      uploadedPhotos = photoContent;
      imgFiltersElement.classList.remove('img-filters--inactive');
      renderPictures(photoContent);
    },
    () => {
      showAlert(DOWNLOAD_ERROR_MESSAGE);
    }
  );
});

const showModal = (picture) => {
  bigPictureCommentsLoaderElement.addEventListener('click', onCommentShowMore);
  bigPictureCommentsLoaderElement.classList.remove('hidden');
  bigPictureBlockElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  currentComments = picture.comments;
  if (currentComments.length <= COMMENTS_TO_SHOW_COUNT) {
    bigPictureCommentsLoaderElement.classList.add('hidden');
    bigPictureCommentsShowCountElement.innerText = currentComments.length;
  } else {
    bigPictureCommentsLoaderElement.classList.remove('hidden');
    bigPictureCommentsShowCountElement.innerText = COMMENTS_TO_SHOW_COUNT;
  }
  createPictureModalData(picture);
  bigPictureCancelElement.addEventListener('click', onModalCancelButtonClick);
  document.addEventListener('keydown', onPictureModalEscPress);
};

openUploadFile();

const showDefault = () => {
  filterDefaultButtonElement.classList.add('img-filters__button--active');
  filterRandomButtonElement.classList.remove('img-filters__button--active');
  filterDiscussedButtonElement.classList.remove('img-filters__button--active');
  renderPictures(uploadedPhotos);
};

const showRandom = () => {
  filterRandomButtonElement.classList.add('img-filters__button--active');
  filterDefaultButtonElement.classList.remove('img-filters__button--active');
  filterDiscussedButtonElement.classList.remove('img-filters__button--active');
  const randomPhotos = [];
  const usedIndexes = [];
  while(randomPhotos.length < MAX_RANDOM_PHOTOS) {
    const index = getRandomInt(0, MAX_RANDOM_PHOTOS - 1);
    if(!usedIndexes.includes(index)) {
      usedIndexes.push(index);
      randomPhotos.push(uploadedPhotos[index]);
    }
  }
  renderPictures(randomPhotos);
};

const showPopular = () => {
  filterDiscussedButtonElement.classList.add('img-filters__button--active');
  filterDefaultButtonElement.classList.remove('img-filters__button--active');
  filterRandomButtonElement.classList.remove('img-filters__button--active');
  const sortedPhotos = [...uploadedPhotos].sort((a, b) => b.comments.length - a.comments.length);
  renderPictures(sortedPhotos);
};

const handleFilterChange = (filterName) => {
  removePhotoContent();
  if(filterName === 'filterDefaultButton') {
    showDefault();
  } else if (filterName === 'filterRandomButton') {
    showRandom();
  } else if (filterName === 'filterDiscussedButton') {
    showPopular();
  }
};

filterDefaultButtonElement.addEventListener('click', debounce(() => {
  handleFilterChange('filterDefaultButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));
filterRandomButtonElement.addEventListener('click', debounce(() => {
  handleFilterChange('filterRandomButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));
filterDiscussedButtonElement.addEventListener('click', debounce(() => {
  handleFilterChange('filterDiscussedButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));

export {showModal};
