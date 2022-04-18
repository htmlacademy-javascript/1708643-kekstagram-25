import {GET_URL, POST_URL} from './data.js';

const getData = (onSuccess, onFail)  => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((content) => {
      onSuccess(content);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (url, formData, onSuccess, onError)  => {
  fetch(
    POST_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => (response.ok) ? onSuccess() : onError())
    .catch((e) => {
      onError(e);
    });
};

export {getData, sendData};
