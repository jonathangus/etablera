import SmoothItem from './SmoothItem'
import { math } from './scroll-utils'

class SmoothFade extends SmoothItem {
  constructor(el: HTMLElement) {
    super(el)

    this.renderedStyles = {
      opacity: {
        previous: 0,
        current: 0,
        ease: 0.04,

        setValue: () => {
          const fromValue = 0
          const toValue = 1

          const val = math.map(
            this.props.top - this.smooth.docScroll,
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

  layout() {
    this.DOM.el.style.opacity = this.renderedStyles.opacity.previous
  }
}

export default SmoothFade
