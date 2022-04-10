import {isEscEvent} from './util.js';
import {arrayPhoto} from './photo.js';

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

const createComments = (commentsData) => {
  const fragment = document.createDocumentFragment();
  commentsData.forEach((comment) => fragment.appendChild(createComment(comment)));
  bigPictureCommentsBlock.appendChild(fragment);
};

const closePictureModal = () => {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureSocialCommentsCount.classList.remove('hidden');
  bigPictureCancel.removeEventListener('click', closePictureModal);
};

const onPictureModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const createPictureModalData = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureCommentsCount.textContent = pictureData.comments;
  createComments(pictureData.comments);
};

const getPhotoId = (evt) => {
  const target = evt.target;
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
  const pictureData = getPhotoDataById(photoId);
  createPictureModalData(pictureData);

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureSocialCommentsCount.classList.add('hidden');

  bigPictureCancel.addEventListener('click', closePictureModal);
  document.addEventListener('keydown', onPictureModalEscPress);
};

export {openPictureModal, closePictureModal};
