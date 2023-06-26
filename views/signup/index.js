//console.log("run");

import { createNotification } from "../components/notification.js";

const form = document.querySelector("#form");
const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const confirmInput = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notification = document.querySelector('#notification');

//Validations
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let confirmValidation = false;

//regex
const NAME_REGEX =
  /^[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú]+(\s*[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú\s]*)$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
//Function events
const validation = (input, regexValidation) => {
  formBtn.disabled = nameValidation && emailValidation && passwordValidation && passwordValidation ? false : true;

  if (regexValidation) {
    input.classList.remove("focus:outline-indigo-700");
    input.classList.remove("focus:outline-red-500");
    input.classList.add("focus:outline-green-500");
    input.classList.add("outline-green-500");
    input.classList.remove("outline-red-500");
  } else {
    input.classList.remove("focus:outline-indigo-700");
    input.classList.remove("focus:outline-green-500");
    input.classList.add("focus:outline-red-500");
    input.classList.add("outline-red-500");
    input.classList.remove("outline-green-500");
  }
  if (input.value === "") {
    input.classList.remove("focus:outline-red-500");
    input.classList.remove("focus:outline-green-500");
    input.classList.add("focus:outline-indigo-700");
    input.classList.remove("outline-red-500");
    input.classList.remove("outline-green-500");
  }
}
//input events
nameInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  nameValidation = NAME_REGEX.test(e.target.value);
  //console.log(nameValidation);
  validation(nameInput, nameValidation);
  if (nameValidation) {
    form.children[0].children[2].classList.add('hidden');
    form.children[0].children[2].classList.remove('flex');
  } else {
    form.children[0].children[2].classList.remove('hidden');
    form.children[0].children[2].classList.add('flex');
  }
});
emailInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  emailValidation = EMAIL_REGEX.test(e.target.value);
  //console.log(nameValidation);
  validation(emailInput, emailValidation);
  if (emailValidation) {
    form.children[1].children[2].classList.add('hidden');
    form.children[1].children[2].classList.remove('flex');
  } else {
    form.children[1].children[2].classList.remove('hidden');
    form.children[1].children[2].classList.add('flex');
  }
});
passwordInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  passwordValidation = PASSWORD_REGEX.test(e.target.value);
  //console.log(nameValidation);
  confirmValidation = e.target.value === confirmInput.value
  validation(confirmInput, confirmValidation);

  validation(passwordInput, passwordValidation);
  if (passwordValidation) {
    form.children[2].children[2].classList.add('hidden');
    form.children[2].children[2].classList.remove('flex');
  } else {
    form.children[2].children[2].classList.remove('hidden');
    form.children[2].children[2].classList.add('flex');
  }
});
confirmInput.addEventListener("input", (e) => {
  confirmValidation = e.target.value === passwordInput.value
  validation(confirmInput, confirmValidation);
  if (confirmValidation) {
    form.children[3].children[2].classList.add('hidden');
    form.children[3].children[2].classList.remove('flex');
  } else {
    form.children[3].children[2].classList.remove('hidden');
    form.children[3].children[2].classList.add('flex');
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
    const response = await axios.post('/api/users', newUser);
    createNotification(false, response.data.check);
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmInput.value = '';
    nameValidation = false;
    emailValidation = false;
    passwordValidation = false;
    confirmValidation = false;
    validation(nameInput, false);
    validation(emailInput, false);
    validation(passwordInput, false);
    validation(confirmInput, false);
    // setTimeout(() => {
    //   notification.innerHTML = ``;
    // }, 5000);
  } catch (error) {
    console.log(error);
    createNotification(true, error.response.data.error);
    setTimeout(() => {
      notification.innerHTML = ``;
    }, 5000);
  }
});
