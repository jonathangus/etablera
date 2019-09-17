import SmoothItem from './SmoothItem'
import { math } from './scroll-utils'

class SmoothLooper extends SmoothItem {
  disabled: boolean = false

  constructor(el: HTMLElement) {
    super(el)

    this.renderedStyles = {
      translationX: {
        previous: 0,
        current: 0,
        ease: 0.1,
        setValue: () => {
          const threshold = 0.1
          const offsetTop = threshold * this.smooth.winSize.height * 0.25
          const offsetBottom = threshold * this.smooth.winSize.height * 0.25
          const bounds = this.DOM.el.getBoundingClientRect()

          const toValue = 0
          const fromValue = 1
          const offset = this.smooth.winSize.height * 1 * -1

          const vals =
            bounds.top + this.smooth.winSize.height + this.props.height

          const val = math.map(
            this.props.top + offset + this.smooth.docScroll,
            this.smooth.winSize.height,
            -1 * this.props.height,
            fromValue,
            toValue
          )

          return val
        },
      },
    }

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

  destroy() {
    super.destroy()
  }

  layout = () => {
    if (this.disabled) return
    this.DOM.el.style.transform = `translateX(${-1 *
      this.renderedStyles.translationX.previous}px)`
  }

  center = () => {}
}

export default SmoothLooper
