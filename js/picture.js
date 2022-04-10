const pictureContainer = document.querySelector('.pictures');
const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a.picture');

const createPicture = (photoData) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = photoData.url;
  picture.querySelector('.picture__comments').innerText = photoData.comments.length;
  picture.querySelector('.picture__likes').innerText = photoData.likes;
  picture.dataset.photoId = photoData.id;
  return picture;
};

export {pictureContainer, createPicture};
