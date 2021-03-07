'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector(`.header`)
const nav = document.querySelector(`.nav`)
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

///////////////////////////////////////
// Cookie Message

// Creating Cookie Message 
const message = document.createElement(`div`)
message.classList.add(`cookie-message`)
message.innerHTML = 'We use your cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

header.after(message)

// Removing Cookie Message
document.querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, function () {
    message.remove()
  })

// Cookie Message - Styles
message.style.backgroundColor = `#37383d`
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + `px`

// Alters all buttons over to an Orange Red --Example
// document.documentElement.style.setProperty(`--color-primary`, `orangered`) 

///////////////////////////////////////
// Page Navigation

const btnScrollTo = document.querySelector(`.btn--scroll-to`)
const section1 = document.querySelector(`#section--1`)

// Smooth Scrolling ===============================

btnScrollTo.addEventListener(`click`, function (e) {
  const s1coords = section1.getBoundingClientRect()
  section1.scrollIntoView({ behavior: `smooth` })
})

// Link Navigation ===============================

document.querySelector(`.nav__links`).addEventListener
  (`click`, function (e) {
    // Matching Strategies
    if (e.target.classList.contains(`nav__link`)) {
      e.preventDefault()
      const id = e.target.getAttribute(`href`)
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
      })
    }
  })

// Tabbed components

const tabs = document.querySelectorAll(`.operations__tab`)
const tabsContainer = document.querySelectorAll(`.operations__tab-container`)
const tabsContent = document.querySelectorAll(`.operations__content`)

tabsContainer.addEventListener(`click`, (e) => {
  const clicked = e.target.closest(`.operations__tab`)
  if (!clicked) return // Guard clause

  // Remove Tab
  tabsContainer.forEach(t => t.classList.remove(`.operations__tab--active`))
  tabsContent.forEach(c => c.classList.remove(`operations__contant--active`))

  // Activate Tab
  clicked.classList.add(`.operations__tab--active`)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`.operations__content--active`)
})