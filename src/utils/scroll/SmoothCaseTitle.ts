import SmoothItem from './SmoothItem'
import { math } from './scroll-utils'

class SmoothCaseTitle extends SmoothItem {
  title: HTMLElement

  constructor(el: HTMLElement, options: { title?: HTMLElement } = {}) {
    super(el)

    this.DOM.title = options.title
    this.renderedStyles = {
      title: {
        previous: 0,
        current: 0,
        ease: 0.1,
        setValue: () => {
          const toValue = 0
          const fromValue = 1
          const val = math.map(
            this.props.left - this.smooth.docScroll,
            this.smooth.winSize.width,
            -1 * this.props.width,
            fromValue,
            toValue
          )

          return Math.max(Math.min(val, fromValue), toValue)
        },
      },
    }

    this.getSize()
    this.update()
  }

  layout() {
    this.DOM.el.style.setProperty(
      '--translate-x-title',
      `${this.renderedStyles.title.previous}`
    )
  }
}

export default SmoothCaseTitle
