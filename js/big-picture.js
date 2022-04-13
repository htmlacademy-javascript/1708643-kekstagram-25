import {isEscEvent} from './util.js';
import {arrayPhoto} from './photo.js';
import {COMMENTS_TO_SHOW_COUNT} from './data.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentShowCount = bigPictureBlock.querySelector('.comments-show-count');
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

let photoCommentsData = {};
let photoShowStep = 1;

const onCommentShowMore = (commentsData) => {
  const photoShowFrom = photoShowStep * COMMENTS_TO_SHOW_COUNT;
  photoShowStep++;
  const photoShowTo = photoShowStep * COMMENTS_TO_SHOW_COUNT;

  bigPictureCommentShowCount.textContent = photoShowTo;

  photoCommentsData = createComments(commentsData);
  console.log(photoCommentsData);

  const commentDataBlock = photoCommentsData.slice(photoShowFrom, photoShowTo);
  createComments(commentDataBlock);

  if (photoShowTo >= photoCommentsData.length) {
    bigPictureCommentShowCount.textContent = photoCommentsData.length;
    bigPictureCommentsLoader.removeEventListener('click', onCommentShowMore);
    if (!bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  }
};

const showComments = (commentsData) => {
  const commentsCount = photoCommentsData.length;
  bigPictureCommentsCount.textContent = commentsCount;
  bigPictureCommentsBlock.innerHTML = '';

  photoShowStep = 0;
  onCommentShowMore(commentsData);

  if (commentsCount <= COMMENTS_TO_SHOW_COUNT) {
    if (!bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  } else {
    bigPictureCommentsLoader.addEventListener('click', onCommentShowMore);
    if (bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.remove('hidden');
    }
  }
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

const createPictureModalData = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureCommentsCount.textContent = pictureData.comments;
  // createComments(pictureData.comments);
  showComments(pictureData.comments);
};

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
  const pictureData = getPhotoDataById(photoId);
  createPictureModalData(pictureData);

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureSocialCommentsCount.classList.add('hidden');

  bigPictureCancel.addEventListener('click', onModalCancelButtonClick);
  document.addEventListener('keydown', onPictureModalEscPress);
};

export {openPictureModal, onModalCancelButtonClick};
