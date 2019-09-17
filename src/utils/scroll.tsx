function scrollIt(
  destination,
  duration = 200,
  easing: string = 'easeOutCubic'
): Promise<void> {
  const easings = {
    linear(t) {
      return t
    },
    easeInQuad(t) {
      return t * t
    },
    easeOutQuad(t) {
      return t * (2 - t)
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic(t) {
      return t * t * t
    },
    easeOutCubic(t) {
      return --t * t * t + 1
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart(t) {
      return t * t * t * t
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    },
    easeInQuint(t) {
      return t * t * t * t * t
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    },
  }

  return new Promise(resolve => {
    const start = window.pageYOffset
    const startTime =
      'now' in window.performance ? performance.now() : new Date().getTime()

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )

    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight
    const destinationOffset =
      typeof destination === 'number' ? destination : destination.offsetTop
    const destinationOffsetToScroll = Math.round(
      documentHeight - destinationOffset < windowHeight
        ? documentHeight - windowHeight
        : destinationOffset
    )

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll)
      if (resolve) {
        resolve()
      }
      return
    }

    function scroll() {
      const now =
        'now' in window.performance ? performance.now() : new Date().getTime()
      const time = Math.min(1, (now - startTime) / duration)
      const timeFunction = easings[easing](time)
      window.scroll(
        0,
        Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
      )

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (resolve) {
          resolve()
        }
        return
      }

      requestAnimationFrame(scroll)
    }

    scroll()
  })
}

export const scrollToOffset = (offset: number, duration = 350) =>
  scrollIt(offset, duration)
export const scrollToElement = (element: HTMLElement) => scrollIt(element, 350)

export const scrollToElementCenter = (
  element: HTMLElement,
  duration: number = 450
) => {
  const bounds = element.getBoundingClientRect()
  const elemDiff = window.innerHeight - bounds.height
  const middle = bounds.top + window.scrollY - elemDiff / 2

  return scrollToOffset(middle, duration)
}
