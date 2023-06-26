
const form = document.querySelector('#form');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const errorText = document.querySelector('#error-text');

//form event
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }
        await axios.post('/api/login', user);
        window.location.pathname = `/contacts/`;
    } catch (error) {
        errorText.innerHTML = error.response.data.error;
        errorText.classList.add('flex');
        errorText.classList.remove('hidden');
    }
})