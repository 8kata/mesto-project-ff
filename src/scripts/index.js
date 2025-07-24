import '../pages/index.css';
import {initialCards} from './cards';
import {createCard, removeCard,toggleLike} from './card';
import {openModal, closeModal} from './modal';
import {closeBuyOverlay} from './modal';

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const imageCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileFormElement = document.forms["edit-profile"];
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const popupsCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardFormElement = document.forms["new-place"];
const popupInputTypeCardName = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = popupTypeNewCard.querySelector('.popup__input_type_url');

function openImg (evt){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  imageCaption.textContent = evt.target.alt;
  openModal(popupTypeImage);
};

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closeBuyOverlay);
  popupsCloseButtons.forEach((button) => {
    button.addEventListener('click', () => {
      closeModal(popup);
    });
  });
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupTypeEdit);
}

profileFormElement.addEventListener('submit', handleFormSubmit);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
      name: popupInputTypeCardName.value,
      link: popupInputTypeUrl.value
    };
    const newCard = createCard(cardData, removeCard, openImg, toggleLike);
    placesList.prepend(newCard);
      closeModal(popupTypeNewCard);
      cardFormElement.reset();
}

cardFormElement.addEventListener('submit', handleProfileFormSubmit);

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, openImg, toggleLike);
  placesList.append(card);
});



