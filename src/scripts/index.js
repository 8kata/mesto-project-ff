import '../pages/index.css';
import {createCard, removeCard,toggleLike} from './card';
import {openModal, closeModal} from './modal';
import {closeBuyOverlay} from './modal';
import {enableValidation, clearValidation} from  './validation';
import {addCard, changeAvatar, changeProfileData, deleteCardApi, getCards, getProfileData, likeCard, unlikeCard } from './api';
import {
  placesList, profileTitle, profileDescription, avatar, profileEditButton, profileAddButton, popupTypeImage, popupImage, 
  imageCaption, popupTypeEdit, profileFormElement, nameInput, jobInput, popupsCloseButtons, popups, popupTypeNewCard, cardFormElement, 
  popupInputTypeCardName, popupInputTypeUrl, popupTypeAvatar, avatarFormElement, avatarInput, config
} from './constants';

let myId = null;

Promise.all([getCards(), getProfileData()])
  .then(([cards, profile]) => {
    myId = profile._id;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    avatar.style.backgroundImage = `url('${profile.avatar}')`;
    
    cards.forEach((card) => {
    const currentCard = createCard(card, cardDelete, openImg, toggleCardLike, myId);
    placesList.append(currentCard);
    })
  })
  .catch((error) => {
    console.log(error);
  })

enableValidation(config);

function toggleCardLike(evt, cardId) {
  const liked = evt.target.classList.contains('card__like-button_is-active');
  let likeRequest = null;
  if (liked) {
    likeRequest = unlikeCard;
  } else {
    likeRequest = likeCard;
  };

  likeRequest(cardId)
    .then((currentCard) => {
      evt.target.closest('.card').querySelector('.card__like-button-counter').textContent = currentCard.likes.length;
      toggleLike(evt.target);
    })
    .catch((error) => {
      console.log(error);
    })
}

function cardDelete(evt, cardId) {
  deleteCardApi(cardId) 
    .then(() => {
      removeCard(evt)
    })
    .catch((error) => {
      console.log(error);
    })
}

function openImg (evt){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
  openModal(popupTypeImage);
};

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, config);
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
  cardFormElement.reset();
  clearValidation(cardFormElement, config);
  openModal(popupTypeNewCard);
});

avatar.addEventListener('click', () => {
  avatarFormElement.reset();
  clearValidation(avatarFormElement, config);
  openModal(popupTypeAvatar);
})

popups.forEach((popup) => {
  popup.addEventListener('click', closeBuyOverlay);
  popupsCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(popup);
    });
  });
});

function handleProfileEditForm(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  changeProfileData(nameInput.value, jobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupTypeEdit)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
}

profileFormElement.addEventListener('submit', handleProfileEditForm);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Создание...';
  const cardData = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value
  }

  addCard(cardData)
    .then((card) => {
      const newCard = createCard(card, cardDelete, openImg, toggleCardLike, myId);
      placesList.prepend(newCard);
      closeModal(popupTypeNewCard);
      cardFormElement.reset();
    })
    .catch((error) => {
    console.log(error);
    })
    .finally(() => {
      evt.submitter.textContent = 'Создать';
    })
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function handleAvatarEditForm(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';

  changeAvatar(avatarInput.value)
    .then((profileData) => {
      avatar.style.backgroundImage = `url('${profileData.avatar}')`;
      closeModal(popupTypeAvatar);
      avatarFormElement.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    })
}

avatarFormElement.addEventListener('submit', handleAvatarEditForm)



