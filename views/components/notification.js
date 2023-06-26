const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {
  if (isError) {
    div.innerHTML = `
            <div class="flex justify-end">
                <p class="bg-gray-500 border-solid border-2 w-3/12 sm:w-3/4 mr-8 p-8 rounded-2xl text-white text-center text-xl font-semibold">${message}</p>
            </div>
        `;
  } else {
    div.innerHTML = `
            <div class="flex justify-end">
                <p class="flex flex-col md:flex-row gap-2 bg-green-500 border-solid border-2 w-6/12 sm:w-3/4 mr-8 p-8 rounded-2xl text-black text-center text-xl font-semibold">${message}</p>
            </div>
        `;
  }
};