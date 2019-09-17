import SmoothItem from './SmoothItem'
import DefferedCallbacks from '../deferred-callbacks'

class SmoothSideScroll extends SmoothItem {
  disabled: boolean = false

  constructor(el: HTMLElement, options: { scrollable: HTMLElement }) {
    super(el)

    this.DOM.scrollable = options.scrollable
    this.DOM.items = Array.from(el.querySelectorAll('[data-case-item]') || [])

    this.renderedStyles = {
      translationX: {
        previous: 0,
        current: 0,
        ease: 0.1,
        setValue: () => this.getMax() * this.getScrollPercentage(),
      },
    }

    this.style()
    this.setSize()
    this.getSize()
    this.update()
  }

  getScrollPercentage = () => {
    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight'
    const val = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)

    return isNaN(val) ? 0 : val
  }

  getMax() {
    return this.DOM.scrollable.scrollWidth - window.innerWidth
  }

  destroy() {
    super.destroy()
    this.smooth.DOM.body.style.height = 'auto'
  }

  setSize() {
    this.smooth.DOM.body.style.height = `${this.getMax()}px`
  }

  style() {
    this.DOM.el.style.position = 'fixed'
    this.DOM.el.style.width = this.DOM.el.style.height = '100%'
    this.DOM.el.style.top = '0px'
    this.DOM.el.style.left = '0px'
    this.DOM.el.style.overflow = 'hidden'
  }

  layout = () => {
    if (this.disabled) return
    this.DOM.scrollable.style.transform = `translateX(${-1 *
      this.renderedStyles.translationX.previous}px)`
  }

  center = (index: number) => {
    this.disabled = true
    return new Promise(async resolve => {
      const count = this.DOM.items.length
      let offset = 0
      const targetCase = this.DOM.items[index]
      const { offsetLeft } = targetCase
      const bounds = targetCase.getBoundingClientRect()

      if (index === 0) {
      } else if (index + 1 === count) {
        offset = -1 * (this.DOM.scrollable.scrollWidth - window.innerWidth)
      } else {
        const extraSpace = this.smooth.winSize.width - bounds.width
        const extraSpaceLeft = extraSpace / 2
        offset = -1 * (offsetLeft - extraSpaceLeft)
      }

      const anime = await DefferedCallbacks.anime()
      anime({
        targets: this.DOM.scrollable,
        translateX: offset,
        duration: 750,
        easing: 'easeInCubic',
        complete: () => {
          requestAnimationFrame(() => {
            resolve()
          })
        },
      })
    })
  }
}

export default SmoothSideScroll
