export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form)=>{
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input)=>{
      input.addEventListener('input',() => {
        isValid(form, input, config);
        toggleButtonState (inputs, button, config);
      });
    });
  });
};

function isValid (formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

function showInputError (formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
 }

 function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

export function clearValidation(formElement,config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputs.forEach((input)=>{
    input.setCustomValidity("");
    hideInputError(formElement, input, config);
  });
  const button = formElement.querySelector(config.submitButtonSelector);
  disableButton(button, config);
}

function disableButton(button, config){
  button.disable = true;
  button.classList.add(config.inactiveButtonClass);
}

function hasInvalidInput(inputs){
  return inputs.some((input) => {
    return !input.validity.valid;
  })
}

function toggleButtonState (inputs, button, config){
  if (hasInvalidInput(inputs)) {
    disableButton(button, config);
  } else {
    button.disable = false;
    button.classList.remove(config.inactiveButtonClass);
  };
};