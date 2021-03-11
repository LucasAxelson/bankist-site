'use strict';

///////////////////////////////////////
// Modal window

const header = document.querySelector(`.header`)
const nav = document.querySelector(`.nav`)
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnScrollTo = document.querySelector(`.btn--scroll-to`)
const section1 = document.querySelector(`#section--1`)
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const tabs = document.querySelectorAll(`.operations__tab`)
const tabsContainer = document.querySelector(`.operations__tab-container`)
const tabsContent = document.querySelectorAll(`.operations__content`)

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
// Page Navigation
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

// Tab Transition ===============================

tabsContainer.addEventListener(`click`, (e) => {
  const clicked = e.target.closest(`.operations__tab`)

  if (!clicked) return // Guard clause

  // Remove Tab 
  tabs.forEach(t => t.classList.remove(`operations__tab--active`))
  tabsContent.forEach(c => c.classList.remove(`operations__content--active`))

  // Activate Tab
  clicked.classList.add(`operations__tab--active`)

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
})

// Menu Fade Animation ===============================

const handleHover = (e, opacity) => {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`)
    const logo = link.closest(`.nav`).querySelector(`img`)

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener(`mouseover`, function (e) {
  handleHover(e, 0.5)
})

nav.addEventListener(`mouseout`, function (e) {
  handleHover(e, 1)
})

///////////////////////////////////////
// Intersection Observer API ===============================

// Navbar becomes sticky as client reaches section 1  =====
const navHeight = nav.getBoundingClientRect().height

const stickyNav = (entries) => {
  const [entry] = entries

  if (!entry.isIntersecting) {
    nav.classList.add(`sticky`)
  } else nav.classList.remove(`sticky`)
}

const headerObserver = new IntersectionObserver
  (stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  })

headerObserver.observe(header)

// Reveal sections upon focusing (scrolling down)  =========

const allSections = document.querySelectorAll(`.section`)

const revealSection = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  entry.target.classList.remove(`section--hidden`)
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver
  (revealSection, {
    root: null,
    threshold: 0.15,
  })

allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add(`section--hidden`)
})

// Lazy-loading images  ===============================

const imgTargets = document.querySelectorAll(`img[data-src]`)

const loadImg = function (entries, observer) {
  const [entry] = entries

  if (!entry.isIntersecting) return

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener(`load`, () => {
    entry.target.classList.remove(`lazy-img`)
  })

  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `50px`,
})

imgTargets.forEach(img => imgObserver.observe(img))

// Testimonial Slider  ===============================
const slider = () => {
  const slides = document.querySelectorAll(`.slide`)
  const btnLeft = document.querySelector(`.slider__btn--left`)
  const btnRight = document.querySelector(`.slider__btn--right`)
  const dotContainer = document.querySelector(`.dots`)

  let curSlide = 0
  const maxSlide = slides.length

  // Functions
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    })
  }

  const activateDot = (slide) => {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => {
        dot.classList.remove(`dots__dot--active`)
      })

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`)
  }

  const goToSlide = (slide) => {
    slides.forEach((s, i) => s.style.transform =
      `translateX(${100 * (i - slide)}%)`)
    // 0%, 100%, 200%, 300%
  }

  // Next slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0
    else curSlide++

    goToSlide(curSlide)
    activateDot(curSlide)
  }

  // Previous slide
  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1
    else curSlide--

    goToSlide(curSlide)
    activateDot(curSlide)
  }

  const init = function () {
    goToSlide(0)
    createDots()
    activateDot(0)
  }

  init()

  // Event handlers
  btnRight.addEventListener(`click`, nextSlide)
  btnLeft.addEventListener(`click`, prevSlide)

  // Listen for Keyboard Events
  document.addEventListener(`keydown`, (e) => {
    if (e.key === `ArrowLeft`) prevSlide()
    e.key === `ArrowRight` && nextSlide()
  })

  dotContainer.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`.dots__dot`)) {
      const { slide } = e.target.dataset

      goToSlide(slide)
      activateDot(slide)
    }
  })
}

slider()