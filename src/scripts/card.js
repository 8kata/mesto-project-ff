export function createCard(card, deleteCard, openImage, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openImage);
  cardLikeButton.addEventListener('click', likeCard)
  return cardElement;
}

export function removeCard (evt) {
  evt.target.closest('.card').remove();
};

export function toggleLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

