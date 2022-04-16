import {GET_URL, POST_URL} from './data.js';

// const getData = (onSuccess, onFail)  => {
const getData = (onSuccess)  => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((content) => {
      onSuccess(content);
    // })
    // .catch(() => {
    //   onFail();
    });
};

const sendData = (data, onSuccess, onFail)  => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => (response.ok) ? onSuccess() : onFail())
    .catch(() => {
      onFail();
    });
};

const postData  = (form) => {
  const formData = new FormData(form);
  fetch(
    POST_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  );
};

export {getData, sendData, postData};
