'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating Cookie Message 
const message = document.createElement(`div`)
message.classList.add(`cookie`)
message.innerHTML = 'We use your cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

header.prepend(message)
header.after(message)

// Removing Cookie Message
document.querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    message.remove()
  })

// Cookie Message - Styles
message.style.backgroundColor = `#37383d`
message.style.width = `120%`
message.style.height = Number.parseFloat(message.getComputedStyle(message).height, 10) + 40 + `px`

// Alters all buttons over to an Orange Red --Example
// document.documentElement.style.setProperty(`--color-primary`, `orangered`) 

const logo = document.querySelector(`nav__logo`)

// Data attributes

const logo = document.querySelector(`nav__logo`)
