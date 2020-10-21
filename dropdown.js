function isElementInViewport(e) {
  let element = e.getBoundingClientRect()
  return (
    element.top >= 0 &&
    element.left >= 0 &&
    element.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    element.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const dropdown = function (btn, menu) {
  const toggleButtons = document.querySelectorAll("[data-toggle=dropdown]")

  toggleButtons.forEach((btn) => {
    let menu = document.querySelector(`#${btn.id} + .dropdown`)
    let type = btn.getAttribute("data-action") || "click"
    let position = btn.getAttribute("data-position") || "bottom-mid"
    position = position.split("-")
    btn.parentNode.style.position = "relative"
    menu.style.position = "absolute"
    let menuHeight = menu.offsetHeight
    let menuWidth = menu.offsetWidth

    let setPosition = () => {
      if (position[0] == "bottom") {
        menu.style.top = `${btn.offsetHeight}px`
      } else if (position[0] == "top") {
        menu.style.top = `-${menuHeight}px`
      }
    }

    setPosition()

    if (position[1] == "right") {
      menu.style.left = `${btn.offsetWidth - menuWidth}px`
    } else if (position[1] == "left") {
      menu.style.left = 0
    } else if (position[1] == "mid") {
      menu.style.left = `${(btn.offsetWidth - menuWidth) / 2}px`
    }

    menu.style.visibility = "hidden"
    menu.style.opacity = 0
    let zindex = menu.style.zIndex
    if (type == "click") {
      document.addEventListener("click", function (e) {
        if (e.target == btn) {
          if (menu.style.opacity != 0) {
            menu.style.zIndex = zindex
            menu.style.visibility = "hidden"
            menu.style.opacity = 0
            setPosition()
          } else {
            if (!isElementInViewport(menu)) {
              if (position[0] == "bottom") {
                menu.style.top = `-${menuHeight}px`
              } else if (position[0] == "top") {
                menu.style.top = `${btn.offsetHeight}px`
              }
            }

            menu.style.zIndex = 999
            menu.style.visibility = "visible"
            menu.style.opacity = 1
          }
        } else if (
          e.target.classList[0] !=
          document.querySelectorAll(`.${menu.classList[0]} > *`)[0].classList[0]
        ) {
          menu.style.zIndex = zindex
          menu.style.visibility = "hidden"
          menu.style.opacity = 0
          setPosition()
        }
      })
    } else if (type == "hover") {
      btn.addEventListener("mouseover", function () {
        if (!isElementInViewport(menu)) {
          if (position[0] == "bottom") {
            menu.style.top = `-${menuHeight}px`
          } else if (position[0] == "top") {
            menu.style.top = `${btn.offsetHeight}px`
          }
        }

        menu.style.zIndex = 999
        menu.style.visibility = "visible"
        menu.style.opacity = 1
      })
      btn.parentNode.addEventListener("mouseleave", function () {
        menu.style.zIndex = zindex
        menu.style.visibility = "hidden"
        menu.style.opacity = 0
        setPosition()
      })
    }
  })
}
