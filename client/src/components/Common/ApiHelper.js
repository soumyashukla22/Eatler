import LRU from 'lru-cache'

let options = {
  max: 30
  , length: function (n, key) {
    return 1;
  }
  , maxAge: 1000 * 60 * 60
};
let cache = LRU(options)

const handleErrors = (response) => {
  if (!response.ok) {
    console.log(response);
  }
  return response;
}

function fetchJsonFromApi(url) {
  console.log(`/api/recipes/${url}`)
  return fetch(`/api/recipes/${url}`, {
    credentials: 'same-origin'
  })
    .then(handleErrors)
    .then(response => (response.json()))
    .then(responseJson => {
      cache.set(url, responseJson);
      return responseJson;
    });
}

export function getDataFromUrl(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  } else {
    return fetchJsonFromApi(url);
  }
}
export function getFreshDataFromUrl(url) {
  return fetchJsonFromApi(url);
}

const dictToFormData = (dict) => {
  let formBody = [];
  for (let property in dict) {
    if (dict.hasOwnProperty(property)) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(dict[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
  }
  formBody = formBody.join("&");
  return formBody;
}

export function postDataToUrl(url, body) {
  console.log(body)
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: dictToFormData(body)
  })
    .then((response) => {
      if (response.status === 200)
        return response.json()
      else {
        return response.text()
      }
    })
    .then((responseJson) => {
    })
}

export function postFileToUrl(url, data, callback) {
  fetch(url, {
    method: 'POST',
    body: data
  }).then((response) => {
    if (response.status === 200)
      return response.json()
    else {
      return response.json()
    }
  }).then((responseJson) => {
    if (callback !== null) {
      console.log("Calling callback")
      callback(responseJson)
    }
  })
}