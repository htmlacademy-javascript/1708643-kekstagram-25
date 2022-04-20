const pictureContainerElement = document.querySelector('.pictures');
const pictureTemplateBlockElement = document.querySelector('#picture');
const pictureTemplateElement = pictureTemplateBlockElement.content.querySelector('a.picture');

const createPicture = (photoData) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoData.url;
  pictureElement.querySelector('.picture__comments').innerText = photoData.comments.length;
  pictureElement.querySelector('.picture__likes').innerText = photoData.likes;
  pictureElement.dataset.photoId = photoData.id;
  return pictureElement;
};

export {pictureContainerElement, createPicture};
