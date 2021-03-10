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

btnScrollTo.addEventListener(`click`, function (e) {

  console.log(`
    Button coords { 
      Left: ${e.target.getBoundingClientRect().left} 
      Top: ${e.target.getBoundingClientRect().top} 
    }

    User coords relative to S1 {
      Left: ${s1coords.left} 
      Window X-Offset: ${window.scrollX}
      Top: ${s1coords.top}
      Window Y-Offset: ${window.scrollY}
    }`)

  // Scrolling

  // `Learn more` btn takes user to Section 1 coords. Refer to C.L above for further Info.
  const s1coords = section1.getBoundingClientRect()
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: `smooth`
  })

  // Modern mechanism for smooth scrolling. Far simpler and agile.
  section1.scrollIntoView({ behavior: `smooth` })

})

// Sticky Navigation - Scroll Event ===============================

const initialCoords = section1.getBoundingClientRect()
window.addEventListener(`scroll`, (e) => {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add(`sticky`)
  } else { nav.classList.remove(`sticky`) }
})