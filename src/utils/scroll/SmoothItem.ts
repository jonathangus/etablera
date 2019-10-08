import { math } from './scroll-utils'
import smooth, { ISmoothScroll } from './smooth-scroll'

type RenderStyle = {
  previous: number
  current: number
  ease: number
  setValue: () => number
}

export interface ISmoothItem {
  smooth: ISmoothScroll
  id: number
  DOM: {
    el: HTMLElement
    items?: Array<HTMLElement>
  }
  isVisible: boolean
  observer: IntersectionObserver

  renderedStyles: {
    [name: string]: RenderStyle
  }

  center?: Function
  layout: Function
  cleanUp?: Function
  onEnter?: Function
}

let count = 0

class SmoothItem implements ISmoothItem {
  smooth = smooth
  DOM = null
  id: number

  props = {
    height: 0,
    width: 0,
    left: 0,
    top: 0,
  }

  isVisible = false
  observer = null
  renderedStyles = null
  cleanUp = null
  onEnter = null

  constructor(el: HTMLElement) {
    this.DOM = { el: el }

    if (!el) return

    this.observer = new IntersectionObserver(entries => {
      this.isVisible = entries.some(entry => entry.intersectionRatio > 0)
      if (!this.isVisible && this.cleanUp) {
        this.cleanUp()
      } else if (this.onEnter) {
        this.onEnter()
      }
    })

    this.id = count
    count++
    this.observer.observe(this.DOM.el)
    this.initEvents()
    this.smooth.add(this)

    this.update()
    this.getSize()
  }

  destroy() {
    this.observer && this.observer.unobserve(this.DOM.el)
    this.removeEvents()
    this.smooth.remove(this)
  }

  update() {
    // sets the initial value (no interpolation)
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[
        key
      ].previous = this.renderedStyles[key].setValue()
    }
    // apply changes/styles
    this.layout()
  }

  getSize() {
    const rect = this.DOM.el.getBoundingClientRect()
    this.props = {
      height: rect.height,
      width: rect.width,
      left: this.smooth.docScroll + rect.left,
      top: this.smooth.docScroll + rect.top,
    }
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize())
  }

  removeEvents() {
    window.removeEventListener('resize', () => this.resize())
  }

  resize = () => {
    this.update()

    this.getSize()
  }

  render() {
    // update the current and interpolated values
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].setValue()

      const val = math.lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].ease
      )

      this.renderedStyles[key].previous = parseFloat(val.toFixed(5))
    }

    // and apply changes
    this.layout()
  }

  layout() {}
}

export default SmoothItem
