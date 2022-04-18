import {isEscEvent, getRandomInt, showAlert, debounce} from './util.js';
import {COMMENTS_TO_SHOW_COUNT, FILTER_CHANGE_DEBOUNCE_TIME, MAX_RANDOM_PHOTOS, DOWNLOAD_ERROR_MESSAGE} from './const.js';
import {getData} from './api.js';
import {openUploadFile} from './preview.js';
import {renderPictures} from './gallery.js';
import {unsetFormSubmit} from './form.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateElement = pictureTemplate.querySelector('a');
const fragment = document.createDocumentFragment();
const picturesWrapper = document.querySelector('.pictures');
const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentsBlock = bigPictureBlock.querySelector('.social__comments');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const bigPictureSocialCommentsCount = bigPictureBlock.querySelector('.social__comment-count');
const body = document.querySelector('body');
const bigPictureCancel = bigPictureBlock.querySelector('.big-picture__cancel');

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const filterDefaultButton = imgFiltersForm.querySelector('#filter-default');
const filterRandomButton = imgFiltersForm.querySelector('#filter-random');
const filterDiscussedButton = imgFiltersForm.querySelector('#filter-discussed');

const template = document.createElement('template');
const commentTemplateString = `
  <li class="social__comment">
    <img
      class="social__picture"
      src=""
      alt=""
      width="35" height="35">
    <p class="social__text"></p>
  </li>`;
template.innerHTML = commentTemplateString;
const templateComment = template.content.querySelector('.social__comment');

const createComment = (comment) => {
  const element = templateComment.cloneNode(true);
  element.querySelector('.social__picture').src = comment.avatar;
  element.querySelector('.social__picture').alt = comment.name;
  element.querySelector('.social__text').innerText = comment.message;
  return element;
};

let photoShowStep = 1;
let currentComments = [];

const createComments = (currentData) => {
  bigPictureCommentsCount.textContent = currentData.length;
  currentData
    .slice(0, photoShowStep * COMMENTS_TO_SHOW_COUNT)
    .forEach((comment) => {
      fragment.appendChild(createComment(comment));
    });
  bigPictureCommentsBlock.innerHTML = '';
  bigPictureCommentsBlock.appendChild(fragment);
};

const onCommentShowMore = () => {
  photoShowStep++;
  if (photoShowStep * COMMENTS_TO_SHOW_COUNT >= currentComments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
  createComments(currentComments);
};

const closePictureModal = () => {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureSocialCommentsCount.classList.remove('hidden');
  photoShowStep = 1;
  unsetFormSubmit();
};

const onModalCancelButtonClick = () => {
  closePictureModal();
  bigPictureCancel.removeEventListener('click', onModalCancelButtonClick);
};

const onPictureModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
    document.removeEventListener('keydown', onPictureModalEscPress);
  }
};

const createPictureModalData = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  // bigPictureCommentsCount.textContent = data.comments.length;
  createComments(data.comments);
};

const createPhotoContent = (photoContent) => {
  photoContent.forEach((photo) => {
    const templateClone = pictureTemplateElement.cloneNode(true);
    templateClone.querySelector('.picture__img').src = photo.url;
    templateClone.querySelector('.picture__likes').textContent = photo.likes;
    templateClone.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(templateClone);
    templateClone.addEventListener('click', () => openUploadFile(photo));
  });

  picturesWrapper.appendChild(fragment);
};

const removePhotoContent = () => {
  const pictures = picturesWrapper.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

let uploadedPhotos = {};

document.addEventListener('DOMContentLoaded', () => {
  getData(
    (photoContent) => {
      uploadedPhotos = photoContent;
      imgFilters.classList.remove('img-filters--inactive');
      renderPictures(photoContent);
    },
    () => {
      showAlert(DOWNLOAD_ERROR_MESSAGE);
    }
  );
});

const showModal = (picture) => {
  bigPictureCommentsLoader.addEventListener('click', onCommentShowMore);
  bigPictureCommentsLoader.classList.remove('hidden');

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  createPictureModalData(picture);
  currentComments = picture.comments;

  bigPictureCancel.addEventListener('click', onModalCancelButtonClick);
  document.addEventListener('keydown', onPictureModalEscPress);
};

openUploadFile();

const showDefault = () => {
  filterDefaultButton.classList.add('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');

  createPhotoContent(uploadedPhotos);
};

const showRandom = () => {
  filterRandomButton.classList.add('img-filters__button--active');
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterDiscussedButton.classList.remove('img-filters__button--active');

  const randomPhotos = [];
  const usedIndexes = [];

  while(randomPhotos.length < MAX_RANDOM_PHOTOS) {
    const index = getRandomInt(0, MAX_RANDOM_PHOTOS - 1);
    if(!usedIndexes.includes(index)) {
      usedIndexes.push(index);
      randomPhotos.push(uploadedPhotos[index]);
    }
  }

  createPhotoContent(randomPhotos);
};

const showPopular = () => {
  filterDiscussedButton.classList.add('img-filters__button--active');
  filterDefaultButton.classList.remove('img-filters__button--active');
  filterRandomButton.classList.remove('img-filters__button--active');

  const sortedPhotos = [...uploadedPhotos].sort((a, b) => b.comments.length - a.comments.length);

  createPhotoContent(sortedPhotos);
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

filterDefaultButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterDefaultButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));

filterRandomButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterRandomButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));

filterDiscussedButton.addEventListener('click', debounce(() => {
  handleFilterChange('filterDiscussedButton');
}, FILTER_CHANGE_DEBOUNCE_TIME));

export {showModal, closePictureModal, onModalCancelButtonClick};
