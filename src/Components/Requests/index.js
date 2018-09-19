import axios from 'axios';

const requestPOSTfetch = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => resolve(json.data))
    .catch(reject)
  })
}

const requestGETfetch = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(res => res.json())
    .then(json => resolve(json))
    .catch(reject)
  })
}

const requestPOST = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      crossdomain: true,
    }).then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const requestGET = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      crossdomain: true,
    }).then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { requestPOST, requestGET, requestPOSTfetch, requestGETfetch };