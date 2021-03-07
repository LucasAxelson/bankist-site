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