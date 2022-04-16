import {isEscEvent, showAlert} from './util.js';
import {arrayPhoto} from './photo.js';
import {COMMENTS_TO_SHOW_COUNT} from './const.js';
import {getData} from './api.js';
import {openUploadFile} from './preview.js';

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
let pictureData = {};

const createComments = () => {

  pictureData
    .comments
    .slice(0, photoShowStep * COMMENTS_TO_SHOW_COUNT)
    .forEach((comment) => fragment.appendChild(createComment(comment)));
  bigPictureCommentsBlock.innerHTML = '';
  bigPictureCommentsBlock.appendChild(fragment);
};

const onCommentShowMore = () => {
  photoShowStep++;
  if (photoShowStep * COMMENTS_TO_SHOW_COUNT >= pictureData.comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  }
  createComments();
};

const closePictureModal = () => {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureSocialCommentsCount.classList.remove('hidden');
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

const createPictureModalData = () => {
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureCommentsCount.textContent = pictureData.comments;
  createComments(pictureData.comments);
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

document.addEventListener('DOMContentLoaded', () => {
  getData(
    (photoContent) => {
      const uploadedPhotos = photoContent;
      createPhotoContent(photoContent);
    },
    () => {
      showAlert('Не удалось загрузить данные!');
    }
  );
});

const getPhotoId = (evt) => {
  const target = evt.target; // ключ в объекте события, на котором это событие произошло (целевой элемент)
  if (target.dataset.photoId !== undefined) {
    return target.dataset.photoId;
  } else {
    const parentTarget = target.parentNode;
    return parentTarget.dataset.photoId;
  }
};

const getPhotoDataById = (photoId) => {
  const photosData = arrayPhoto;
  const photoDataById = photosData.find((element) => element.id === Number(photoId));
  return photoDataById;
};

const openPictureModal = (evt) => {
  const photoId = getPhotoId(evt);
  pictureData = getPhotoDataById(photoId);
  createPictureModalData();

  bigPictureCommentsLoader.addEventListener('click', onCommentShowMore);
  bigPictureCommentsLoader.classList.remove('hidden');

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureSocialCommentsCount.classList.add('hidden');

  bigPictureCancel.addEventListener('click', onModalCancelButtonClick);
  document.addEventListener('keydown', onPictureModalEscPress);
};

export {openPictureModal, onModalCancelButtonClick};
