export {
  placesList, profileTitle, profileDescription, avatar, profileEditButton, profileAddButton, popupTypeImage, popupImage, 
  imageCaption, popupTypeEdit, profileFormElement, nameInput, jobInput, popupsCloseButtons, popups, popupTypeNewCard, cardFormElement, 
  popupInputTypeCardName, popupInputTypeUrl, popupTypeAvatar, avatarFormElement, avatarInput, config
};

const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatar = document.querySelector('.profile__image');
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
const popupInputTypeCardName = cardFormElement.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = cardFormElement.querySelector('.popup__input_type_url');
const popupTypeAvatar = document.querySelector('.popup_type_edit-avatar');
const avatarFormElement = document.forms["edit-avatar"];
const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar-url');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 