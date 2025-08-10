export function createCard(card, deleteCard, openImage, likeCard, ownerId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-button-counter');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCounter.textContent = card.likes.length || 0;
  cardImage.addEventListener('click', openImage);
  cardLikeButton.addEventListener('click', (evt) => {
    likeCard(evt, card._id);
  });
  
  if(card.owner._id !== ownerId){
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', (evt) => {
    deleteCard(evt, card._id);
    });
  }

  if(card.likes.some((owner)=>{
    return owner._id === ownerId;
  })){
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export function removeCard (evt) {
  evt.target.closest('.card').remove();
};

export function toggleLike (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

