const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42', 
  headers: {
    authorization: '0ecabfe2-6856-4cfb-a569-579a6d23d6aa',
    'Content-Type': 'application/json'
  }
}

function switchResponse(res) {
  if (res.ok){
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  };
};

function handleRequest (endpoint, settings = {}) {
  const {method = "GET",headers = apiConfig.headers, body} = settings;
  const requestSettings = {method, headers};
  if (body) {
    requestSettings.body = JSON.stringify(body)
  }
  return fetch(`${apiConfig.baseUrl}${endpoint}`, requestSettings)
    .then(switchResponse)
}

export function getCards() {
  return handleRequest('/cards');
}

export function getProfileData() {
  return handleRequest('/users/me');
}

export function likeCard(cardId) {
  return handleRequest(`/cards/likes/${cardId}`, {method: "PUT"});
}

export function unlikeCard(cardId) {
  return handleRequest(`/cards/likes/${cardId}`, {method: "DELETE"});
}

export function deleteCardApi(cardId) {
  return handleRequest(`/cards/${cardId}`, {method: "DELETE"});
}

export function addCard(cardData) {
  return handleRequest('/cards', {method: "POST", body: {name: cardData.name, link: cardData.link}});
}

export function changeAvatar(avatar) {
  return handleRequest('/users/me/avatar', {method: "PATCH", body: {avatar}});
}

export function changeProfileData(name, about) {
  return handleRequest('/users/me', {method: "PATCH", body: {name, about}});
}

