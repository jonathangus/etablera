import SmoothItem from './SmoothItem'
import { $etableraDescription } from '../dom-selectors'

class SmoothEtablera extends SmoothItem {
  disabled: boolean = false
  nextOffset: number = 500

  constructor(el: HTMLElement) {
    super(el)
    if (!el) return

    this.DOM.content = el
    this.DOM.nextContent = document.querySelector('[data-scroll-target]')
    this.renderedStyles = {
      fade: {
        previous: 0,
        current: 0,
        ease: 0.2,
        setValue: () => {
          const max = this.nextOffset
          const value = Math.min(Math.max(this.smooth.docScroll / max, 0), 1)

          return value
        },
      },
    }
    this.getSize()
    this.update()
  }

  getSize() {
    const rect = this.DOM.el.getBoundingClientRect()
    this.props = {
      height: rect.height,
      width: rect.width,
      left: this.smooth.docScroll + rect.left,
      top: this.smooth.docScroll + rect.top,
    }
    if (this.DOM.nextContent) {
      const { height } = this.DOM.nextContent.getBoundingClientRect()
      this.nextOffset = this.smooth.winSize.height / 2 - height / 2
    }
  }

  cleanUp = () => {
    this.DOM.content.style.opacity = '0'
    if (this.DOM.description) {
      this.DOM.description.style.opacity = '0'
    }
  }

  layout = () => {
    if (this.disabled) return
    const opacity = (1 - this.renderedStyles.fade.previous).toFixed(2)
    const scale = 1.65 * this.renderedStyles.fade.previous + 1

    this.DOM.description = $etableraDescription.resolve()
    this.DOM.content.style.transform = `translate(-50%,-50%) scale(${scale})`
    this.DOM.content.style.opacity = opacity

    if (this.DOM.description) {
      this.DOM.description.style.opacity = (
        1 -
        this.renderedStyles.fade.previous * 4
      ).toFixed(2)
    }
  }
}

export default SmoothEtablera
