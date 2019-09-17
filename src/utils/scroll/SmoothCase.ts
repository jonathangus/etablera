import SmoothItem from './SmoothItem'
import { math } from './scroll-utils'
import DefferedCallbacks from '../deferred-callbacks'

class SmoothCase extends SmoothItem {
  borderSize: number = 0

  constructor(
    el: HTMLElement,
    options: { shadow: HTMLElement; title: HTMLElement }
  ) {
    super(el)

    this.borderSize = this.DOM.el
      .querySelector('[data-case-border]')
      .getBoundingClientRect().width

    this.DOM.title = options.title
    this.DOM.shadow = options.shadow
    this.renderedStyles = {
      scale: {
        previous: 0,
        current: 0,
        ease: 0.3,
        setValue: () => {
          const toValue = 0
          const fromValue = 1

          const offsetMultiplier = this.smooth.winSize.width < 900 ? 1 : 0.7
          const offset = this.smooth.winSize.height * offsetMultiplier * -1

          const val = math.map(
            this.props.top + offset - this.smooth.docScroll,
            this.smooth.winSize.height,
            -1 * this.props.height,
            fromValue,
            toValue
          )

          return math.limitBetween(val, toValue, 1)
        },
      },
      titleTranslationY: {
        previous: 0,
        current: 0,
        ease: 0.1,
        fromValue: Number(math.getRandomFloat(50, window.innerHeight * 0.3)),
        setValue: () => {
          const fromValue = this.renderedStyles.titleTranslationY.fromValue
          const toValue = -1 * fromValue

          const val = math.map(
            this.props.top - this.smooth.docScroll,
            this.smooth.winSize.height,
            -1 * this.props.height,
            fromValue,
            toValue
          )
          return fromValue < 0
            ? Math.min(Math.max(val, fromValue), toValue)
            : Math.max(Math.min(val, fromValue), toValue)
        },
      },
    }

    this.getSize()
    this.update()
  }

  fadeOutTitle = async () => {
    const anime = await DefferedCallbacks.anime()
    anime({
      targets: this.DOM.title,
      opacity: [1, 0],
      translateY: [0, 50],
      easing: 'easeOutSine',
      duration: 400,
    })

    return new Promise(resolve => setTimeout(resolve, 200))
  }

  layout = () => {
    const stupidPixelFix = 2
    const val = Math.floor(
      this.renderedStyles.scale.previous * this.borderSize * 2 + stupidPixelFix
    )
    // const scaleY = 1 - val / Math.floor(this.props.height)
    // const scaleX = 1 - val / Math.floor(this.props.width)
    // this.DOM.shadow.style.transform = `scaleY(${scaleY})scaleX(${scaleX})`

    const borders = Array.from(
      this.DOM.el.querySelectorAll('[data-case-border]')
    )
    borders.forEach((borderEl: HTMLElement) => {
      borderEl.style.setProperty(
        '--border-size',
        `${this.renderedStyles.scale.previous}`
      )
    })

    this.DOM.title.style.setProperty(
      '--translate-y-title',
      `${this.renderedStyles.titleTranslationY.previous}px`
    )
  }
}

export default SmoothCase
