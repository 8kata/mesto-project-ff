const placesList = document.querySelector('.places__list');

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

function removeCard (evt){
  evt.target.closest('.card').remove();
};

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard);
  placesList.append(card);
});