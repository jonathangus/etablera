import SmoothItem from './SmoothItem'
import { math } from './scroll-utils'

class SmoothFullImage extends SmoothItem {
  constructor(el: HTMLElement, zoomValue: number = 1.25) {
    super(el)

    this.renderedStyles = {
      imageScale: {
        previous: 0,
        current: 0,
        ease: 0.1,
        setValue: () => {
          const toValue = zoomValue
          const fromValue = 1

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

  layout = () => {
    const value = this.renderedStyles.imageScale.previous
    this.DOM.el.style.transform = `scale(${value})`
  }
}

export default SmoothFullImage
