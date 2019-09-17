import { revealCubicJs } from '../../../vars'
import DefferedCallbacks from '../../../utils/deferred-callbacks'

class Slideshow {
  current: number = 0

  width: number = 0
  height: number = 0
  winSize: Object
  inProgress: boolean

  container: HTMLElement
  items: Array<HTMLElement>
  titles: Array<string>
  nameNode: HTMLElement
  navItems: Array<HTMLElement>
  contentBg: HTMLElement

  init(container: HTMLElement) {
    this.container = container
    this.items = Array.from(container.querySelectorAll('[data-case-slide]'))
    this.titles = Array.from(
      container.querySelectorAll('[data-case-name]')
    ).map(node => node.getAttribute('data-case-name'))
    this.nameNode = container.querySelector('[data-title]')
    this.navItems = Array.from(container.querySelectorAll('[data-nav]'))
    this.contentBg = container.querySelector('[data-content-bg]')
    const storedIndex = window.sessionStorage.getItem('slideIndex')
    this.current = storedIndex ? parseInt(storedIndex) : 0

    this.changeTriggers(this.current)
  }

  swipeXStart = 0
  swipeYStart = 0

  display = () => {
    this.showFirst()
  }

  onTouchStart = (event: TouchEvent) => {
    this.swipeXStart = event.changedTouches[0].screenX
    this.swipeYStart = event.changedTouches[0].screenY
  }

  onTouchEnd = (event: TouchEvent) => {
    const xDiff = event.changedTouches[0].screenX - this.swipeXStart
    const yDiff = event.changedTouches[0].screenY - this.swipeYStart
    const sensitivity = 25

    if (xDiff < -sensitivity) {
      this.next()
    } else if (xDiff > sensitivity) {
      this.previous()
    } else if (yDiff < -sensitivity) {
      this.next()
    } else if (yDiff > sensitivity) {
      this.previous()
    }
  }

  listenToSwipes = () => {
    document.addEventListener('touchstart', this.onTouchStart, false)
    document.addEventListener('touchend', this.onTouchEnd, false)
  }

  destroy = () => {
    document.removeEventListener('touchstart', this.onTouchStart)
    document.removeEventListener('touchend', this.onTouchEnd)
  }

  showArrows = () => {}

  next = () => {
    const nextCurrent = this.items[this.current + 1] ? this.current + 1 : 0

    this.animate('right', nextCurrent)
  }

  previous = () => {
    const nextCurrent = this.items[this.current - 1]
      ? this.current - 1
      : this.items.length - 1

    this.animate('left', nextCurrent)
  }

  changeTriggers = (index: number) => {
    this.items.forEach((el, i) => {
      el.style.pointerEvents = i === index ? 'all' : 'none'
      el.style.zIndex = i === index ? '10' : '1'
    })
  }

  animate = async (direction: 'left' | 'right', nextCurrent: number) => {
    if (this.inProgress) {
      return
    }
    this.inProgress = true
    this.changeTriggers(nextCurrent)
    const currentSlide = this.items[this.current]
    const nextSlide = this.items[nextCurrent]
    const goLeft = {
      x: '-20%',
      y: '-20%',
    }
    const goRight = {
      x: '20%',
      y: '20%',
    }
    const start = direction === 'right' ? goRight : goLeft
    const out = direction === 'right' ? goLeft : goRight

    this.animateOutContent()
    const anime = await DefferedCallbacks.anime()

    anime
      .timeline()
      .add({
        targets: currentSlide,
        opacity: [1, 0],
        translateX: out.x,
        translateY: out.y,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 400,
      })
      .add(
        {
          targets: nextSlide,
          opacity: [0, 1],
          translateX: [start.x, 0],
          translateY: [start.y, 0],
          easing: 'cubicBezier(.5, .05, .1, .3)',
          duration: 400,
          complete: () => {
            this.current = nextCurrent
            window.sessionStorage.setItem('slideIndex', `${nextCurrent}`)
            this.inProgress = false
            this.animateInContent()
          },
        },
        '-=200'
      )
  }

  cleanup = (): Promise<void> => {
    return new Promise(resolve => {
      this.animateOutContent()
      this.navItems.forEach(nav => nav.classList.add('out'))
      setTimeout(() => {
        resolve()
      }, 400)
    })
  }

  showFirst = async () => {
    const target = this.items[this.current]
    this.nameNode.innerHTML = this.titles[this.current]

    const anime = await DefferedCallbacks.anime()

    anime
      .timeline()
      .add({
        targets: target,
        opacity: [0, 1],
        translateY: [30, 0],
      })
      .add(
        {
          targets: [this.contentBg, this.nameNode],
          translateY: ['100%', 0],
          easing: revealCubicJs,
          duration: 500,
          complete: () => {
            this.listenToSwipes()
            this.navItems.forEach(nav => nav.classList.add('show'))
          },
        },
        '-=200'
      )
  }

  animateOutContent = async () => {
    const anime = await DefferedCallbacks.anime()

    anime({
      targets: [this.nameNode, this.contentBg],
      translateX: [0, '-100%'],
      easing: revealCubicJs,
      duration: 500,
    })
  }

  animateInContent = async () => {
    const anime = await DefferedCallbacks.anime()

    this.nameNode.innerHTML = this.titles[this.current]
    anime({
      targets: [this.nameNode, this.contentBg],
      translateX: ['-100%', 0],
      easing: revealCubicJs,
      duration: 500,
    })
  }
}

export default Slideshow
