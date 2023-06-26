const navBar = document.querySelector('#navbar');

const createNavHome = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
            <p class="font-bold text-white text-xl">List Contact</p>
            <!-- version movil -->
            <svg
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-12 h-12 md:hidden text-white cursor-pointer p-2 hover:bg-red-600 rounded-2xl">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                     />
              </svg>  
              
              <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-lg text-white font-bold bg-red-800 hover:bg-red-500 py-2 px4 p-2 rounded-lg transition ease-in-out duration-500">Login</a>
                <a href="/signup" class="text-lg text-black font-bold bg-indigo-600 hover:bg-indigo-400 py-2 px4 p-2 rounded-xl transition ease duration-500">Register</a>  
              </div>
              <!-- version Celular -->
              <div class="hidden bg-red-700 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 transition duration-1000">
                  <a href="/login/" class="text-lg text-white font-bold bg-red-800 hover:bg-red-500 py-2 px4 p-2 rounded-lg transition ease-in-out duration-500">Login</a>
                  <a href="/signup" class="text-lg text-black font-bold bg-indigo-600 hover:bg-indigo-400 py-2 px4 p-2 rounded-xl transition ease duration-500">Register</a>
              </div>
        </div>
    `;
};

const createNavSignUp = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
            <p class="font-bold text-white text-xl">List Contact</p>
            <!-- version movil -->
            <svg
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-12 h-12 md:hidden text-white cursor-pointer p-2 hover:bg-red-600 rounded-2xl">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                     />
              </svg>  
              
              <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-lg text-white font-bold bg-red-800 hover:bg-red-500 py-2 px4 p-2 rounded-lg transition ease-in-out duration-500">Login</a>
              </div>
              <!-- version Celular -->
              <div class="hidden bg-red-700 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 transition duration-1000">
                  <a href="/login/" class="text-lg text-white font-bold bg-red-800 hover:bg-red-500 py-2 px4 p-2 rounded-lg transition ease-in-out duration-500">Login</a>
              </div>
        </div>
    `;
};

const createNavLogIn = () => {
  navbar.innerHTML = `
    <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">
            <p class="font-bold text-white text-xl">List Contact</p>
            <!-- version movil -->
            <svg
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                class="w-12 h-12 md:hidden text-white cursor-pointer p-2 hover:bg-red-600 rounded-2xl">
                <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                     />
              </svg>  
              
              <!-- version escritorio -->
              <div class="hidden md:flex flex-row gap-4">
                <a href="/signup" class="text-lg text-black font-bold bg-indigo-600 hover:bg-indigo-400 py-2 px4 p-2 rounded-xl transition ease duration-500">Register</a>  
              </div>
              <!-- version Celular -->
              <div class="hidden bg-red-700 fixed top-16 right-0 left-0 bottom-0 justify-center items-center flex-col gap-4 transition duration-1000">
                  <a href="/signup" class="text-lg text-black font-bold bg-indigo-600 hover:bg-indigo-400 py-2 px4 p-2 rounded-xl transition ease duration-500">Register</a>
              </div>
        </div>
    `;
};

if (window.location.pathname === '/') {
  createNavHome();
}
if (window.location.pathname === '/signup/') {
  createNavSignUp();
}
if (window.location.pathname === '/login/') {
  createNavLogIn();
}

//ventana movil
const windowMenu = navBar.children[0].children[3];
//button menu
const navBtn = navBar.children[0].children[1];
//console.log(navBtn);

navBtn.addEventListener('click', (e) => {
  if (!navBtn.classList.contains('active')) {
    navBtn.classList.add('active');
    navBtn.innerHTML = `<path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6 18L18 6M6 6l12 12"
/>`;
    //console.log(windowMenu);
    windowMenu.classList.remove('hidden');
    windowMenu.classList.add('flex');
  } else {
    navBtn.classList.remove('active');
    navBtn.innerHTML = `<path 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
     />`;
    windowMenu.classList.add('hidden');
    windowMenu.classList.remove('flex');
  }
});
