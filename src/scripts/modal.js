
export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeBuyEsc);
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeBuyEsc)
};

export function closeBuyOverlay(evt){
  if (evt.target.classList.contains('popup_is-opened')){
    closeModal(evt.target);
  };
};

 function closeBuyEsc(evt){
  if (evt.key === 'Escape') {
   const openPopup = document.querySelector('.popup_is-opened');
   closeModal(openPopup);
  };
};