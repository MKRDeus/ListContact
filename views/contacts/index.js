//navegacion
//links menu
const addLink = document.querySelector("#add-link");
const contactLink = document.querySelector("#contact-link");
const logOutLink = document.querySelector("#logout-link");
//containers
const formContainer = document.querySelector("#form");
const listContainer = document.querySelector("#list-container");
const helpContact = document.querySelector('#help-contact');

// formulary
const form = document.querySelector("#form");
// Inputs del Registre
const nameInput = document.querySelector("#name-input");
const numberphoneInput = document.querySelector("#numberphone-input");
//Contacts list
const list = document.querySelector("#list");
const NAME_REGEX = /^[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú]+(\s*[A-Z\u00d1][a-zA-Z-ÿ\u00f1\u00d1áéíóú\s]*)$/;
const NUMBER_REGEX = /^(0424|0414|0416|0426|0412|0212)(\d{7})$/;

//info
const showInfo = document.querySelector('#show-info');
const hideInfo = document.querySelector('#hide-info');
const info = document.querySelector('#info');


addLink.addEventListener("click", function () {
  //mostrar agregar contacto
  formContainer.classList.add("flex");
  formContainer.classList.remove("hidden");
  //ocultar lista de contacto
  listContainer.classList.add("hidden");
  listContainer.classList.remove("flex");
});
contactLink.addEventListener("click", function () {
  //mostrar lista de contacto
  listContainer.classList.add("flex");
  listContainer.classList.remove("hidden");
  //ocultar agragar contacto
  formContainer.classList.add("hidden");
  formContainer.classList.remove("flex");
});
logOutLink.addEventListener("click", async function () {
  try {
    await axios.get('/api/logout');
    window.location.pathname = '/login/';
  } catch (error) {
    console.log(error);
  }
});

const validation = (validation, input) => {
  if (validation) {
    input.classList.add("bg-green-700");
    input.classList.remove("bg-red-700");
    input.parentElement.children[2].classList.add("hidden");
    input.parentElement.children[2].classList.remove("flex");
  } else {
    input.classList.add("bg-red-700");
    input.classList.remove("bg-green-700");
    input.parentElement.children[2].classList.add("flex");
    input.parentElement.children[2].classList.remove("hidden");
  }
  if (input.value === '') {
    input.classList.remove("bg-red-700");
    input.classList.remove("bg-green-700");
    input.parentElement.children[2].classList.remove("flex");
    input.parentElement.children[2].classList.add("hidden");
  }
};
nameInput.addEventListener("input", (e) => {
  const nameValidation = NAME_REGEX.test(e.target.value);
  validation(nameValidation, nameInput);
});
numberphoneInput.addEventListener("input", (e) => {
  const numberphoneValidation = NUMBER_REGEX.test(e.target.value);
  validation(numberphoneValidation, numberphoneInput);
});

//form event
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newContact = {
    name: nameInput.value,
    number: numberphoneInput.value,
  };
  const { data } = await axios.post('/api/contacts', newContact);
  //Create Items Contact
  const listItem = document.createElement("li");
  listItem.id = data.id;
  listItem.innerHTML = `
  <li class="h-24 flex flex-row gap-4 bg-gray-600 rounded-xl p-3 m-0">
  <div class="flex flex-col md:flex-row w-3/4 gap-2"><input id="name-contact" type="text"
  class="w-full text-lg font-semibold p-2 rounded-xl outline-none outline-4 bg-gray-400"
  value="${data.name}" readonly />
<input id="numberphone-contact" type="text"
  class="w-full text-lg font-semibold p-2 rounded-xl outline-none outline-4 bg-gray-400 "
  value="${data.number}" readonly />
</div>
<div class="w-1/4">
  <div class="h-full w-full flex flex-col md:flex-row gap-2">
    <button id="delete-btn" class="h-full w-full bg-red-500 hover:bg-red-700 flex justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white"
        name="trash-bin-outline"></ion-icon>
    </button>
    <button id="edit-btn" class="h-full w-full bg-blue-500 hover:bg-blue-700 flex justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white" name="create-outline"></ion-icon>
    </button>
    <button id="check-btn" disabled
      class="h-full w-full bg-green-500 hover:bg-green-700 hidden justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white"
        name="checkmark-circle-outline"></ion-icon>
    </button>
  </div>
</div>  
</li>


    `;
  //Add listItem to list
  list.appendChild(listItem);

  //

});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  nameInput.value = "";
  numberphoneInput.value = "";
});

list.addEventListener('click', async (e) => {
  if (e.target.closest('#delete-btn')) {
    try {
      const contact = e.target.closest('#delete-btn').parentElement.parentElement.parentElement.parentElement;
      await axios.delete(`/api/contacts/${contact.id}`);
      list.removeChild(contact);
    } catch (error) {
      console.log(error);
    }
  }

  if (e.target.closest('#edit-btn')) {
    const editBtn = e.target.closest('#edit-btn');
    const contactList = e.target.closest('#edit-btn').parentElement.parentElement.parentElement.children[0].children[0];
    const numberList = e.target.closest('#edit-btn').parentElement.parentElement.parentElement.children[0].children[1];
    const doneBtn = e.target.closest('#edit-btn').parentElement.children[2];

    //remove readonly
    contactList.removeAttribute("readonly");
    numberList.removeAttribute("readonly");
    //mostrar done-btn
    doneBtn.classList.add('flex');
    doneBtn.classList.remove('hidden');
    //esconder edit-btn
    editBtn.classList.remove('flex');
    editBtn.classList.add('hidden');

  }
  if (e.target.closest('#check-btn')) {
    try {
      const contact = e.target.closest('#check-btn').parentElement.parentElement.parentElement.parentElement;
      const contactList = e.target.closest('#check-btn').parentElement.parentElement.parentElement.children[0].children[0];
      const numberList = e.target.closest('#check-btn').parentElement.parentElement.parentElement.children[0].children[1];
      const editBtn = e.target.closest('#check-btn').parentElement.children[1];
      const doneBtn = e.target.closest('#check-btn');
      await axios.patch(`/api/contacts/${contact.id}`, { name: contactList.value, number: numberList.value });
      //set readonly
      contactList.setAttribute("readonly", "on");
      numberList.setAttribute("readonly", "on");
      //mostrar edit-btn
      editBtn.classList.add('flex');
      editBtn.classList.remove('hidden');
      //esconder edit-btn
      doneBtn.classList.remove('flex');
      doneBtn.classList.add('hidden');
      //quitar background
      contactList.classList.remove('bg-green-500');
      numberList.classList.remove('bg-green-500');
      //colocar background
      contactList.classList.add('bg-gray-400');
      numberList.classList.add('bg-gray-400');
    } catch (error) {
      console.log(error);
    }
  }
});
//Validaciones de ediciones de contactos
list.addEventListener('input', (e) => {
  const contactValidation = (contactValidation, input) => {
    if (contactValidation) {
      input.classList.add("focus:bg-green-500");
      input.classList.add("bg-green-500");
      input.classList.remove("focus:bg-red-500");
      input.classList.remove("bg-red-500");
    } else {
      input.classList.add("focus:bg-red-500");
      input.classList.add("bg-red-500");
      input.classList.remove("focus:bg-green-500");
      input.classList.remove("bg-green-500");
    }
    if (input.value === '') {
      input.classList.remove("focus:bg-green-500");
      input.classList.remove("bg-red-500");
      input.classList.remove("focus:bg-red-500");
      input.classList.remove("bg-green-500");
    }
  };

  if (e.target.closest('#name-contact')) {
    nameContact = e.target.closest('#name-contact');
    const nameValidation = NAME_REGEX.test(nameContact.value);
    contactValidation(nameValidation, nameContact);
  }
  if (e.target.closest('#numberphone-contact')) {
    const numberContact = e.target.closest('#numberphone-contact');
    const numberphoneValidation = NUMBER_REGEX.test(numberContact.value);
    contactValidation(numberphoneValidation, numberContact);
  }
});

showInfo.addEventListener('click', function () {
  info.classList.add('flex');
  info.classList.remove('hidden');
});

hideInfo.addEventListener('click', function () {
  info.classList.add('hidden');
  info.classList.remove('flex');
});
//Cargar Base de Datos
(async () => {
  try {
    const { data } = await axios.get('/api/contacts', { withCredentials: true });
    data.forEach(contact => {
      const listItem = document.createElement("li");
      listItem.id = contact.id;
      listItem.innerHTML = `
  <li class="h-24 flex flex-row gap-4 bg-gray-600 rounded-xl p-3 m-0">
  <div class="flex flex-col md:flex-row w-3/4 gap-2"><input id="name-contact" type="text"
  class="w-full text-lg font-semibold p-2 rounded-xl outline-none outline-4 bg-gray-400"
  value="${contact.name}" readonly />
<input id="numberphone-contact" type="text"
  class="w-full text-lg font-semibold p-2 rounded-xl outline-none outline-4 bg-gray-400 "
  value="${contact.number}" readonly />
</div>
<div class="w-1/4">
  <div class="h-full w-full flex flex-col md:flex-row gap-2">
    <button id="delete-btn" class="h-full w-full bg-red-500 hover:bg-red-700 flex justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white"
        name="trash-bin-outline"></ion-icon>
    </button>
    <button id="edit-btn" class="h-full w-full bg-blue-500 hover:bg-blue-700 flex justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white" name="create-outline"></ion-icon>
    </button>
    <button id="check-btn" disabled
      class="h-full w-full bg-green-500 hover:bg-green-700 hidden justify-center items-center rounded-2xl p-2">
      <ion-icon class="text-3xl text-black hover:text-white"
        name="checkmark-circle-outline"></ion-icon>
    </button>
  </div>
</div>  
</li>
    `;
      list.appendChild(listItem);
    })
  } catch (error) {
    window.location.pathname = '/login/';
  }
})();
