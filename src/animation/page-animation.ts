import {
  waitForRequestAnimationFrame,
  waitForTransition,
  waitForIdle,
} from './animation-helper'
import { scrollToElementCenter } from '../utils/scroll'
import isMobile from 'ismobilejs'
import { $caseHeader, $mediaImage } from '../utils/dom-selectors'
import { unstable_next } from 'scheduler'

export const CASE_ANIMATION_DURATION = 450

let caseTransitionInProgress = false
export const CASE_ANIMATION_CONTAINER_ID = 'case-animation-container'
export const CASE_INDICATOR_ID = 'case-indicator'

export const classStates = {
  ANIMATED_COMPLETE: 'animated',
  ANIMATION_VIDEO: 'animation-video',
  TRANSITION_COMPLETE: 'transition-complete',
}

export const setPageOpacity = (num: number) => {
  getPageWrapper().style.opacity = `${num}`
}
export const getPageWrapper = (): HTMLElement =>
  document.querySelector('#page-wrapper')

const videoIsPlaying = (vid: HTMLVideoElement) => {
  return Boolean(
    (vid.getAttribute('metadata-loaded') &&
      vid.getAttribute('video-started')) ||
      vid.currentTime > 0
  )
}

let loaderIndicatorTimeout

export const cleanUpCaseAnimation = (isCleanup: boolean = false) => {
  const containerMedia = document.getElementById(CASE_ANIMATION_CONTAINER_ID)

  window.shouldAnimate = true
  setPageOpacity(1)
  document.querySelector('body').classList.remove('scroll-lock')

  if (!containerMedia) {
    return (caseTransitionInProgress = false)
  }

  const target: HTMLElement = document.querySelector('#case-page-media')

  if (isCleanup && !containerMedia.classList.contains('animated')) {
    return containerMedia.remove()
  } else if (isCleanup) return

  const currVideo = containerMedia.querySelector('video')

  containerMedia.classList.add('animated')

  if (currVideo && videoIsPlaying(currVideo)) {
    containerMedia.classList.add(classStates.ANIMATION_VIDEO)
    target.parentNode && target.parentNode.replaceChild(containerMedia, target)
    containerMedia.classList.remove('fullscreen')
    // TODO
    setTimeout(() => {
      currVideo.play()
    }, 100)
  } else {
    const targetImage = $mediaImage.resolve(target)
    const containerImage = $mediaImage.resolve(containerMedia)

    if (targetImage && containerImage) {
      targetImage.parentNode &&
        targetImage.parentNode.replaceChild(containerImage, targetImage)
    }
    containerMedia.remove()
  }

  if (caseTransitionInProgress) {
    const height = containerMedia.getBoundingClientRect().height
    // Fix iphone height in safari

    if (isMobile(window.navigator.userAgent).apple.phone && height > 500) {
      const caseHeaderEl = $caseHeader.resolve()
      caseHeaderEl.style.height = `${height}px`
    }
  }

  clearTimeout(loaderIndicatorTimeout)
  document.getElementById(CASE_INDICATOR_ID).classList.remove('show')

  containerMedia.classList.remove(classStates.TRANSITION_COMPLETE)
  caseTransitionInProgress = false
}

type MediaElement = HTMLElement

const ANIMATION_TIMEOUT = 850
const SCROLL_CENTER_TIMER = 450
// https://aerotwist.com/blog/flip-your-animations/
export const animateToCase = async (
  container: MediaElement,
  withScrollCenter: boolean = true
): Promise<void> => {
  if (caseTransitionInProgress) return
  caseTransitionInProgress = true
  window.shouldAnimate = false

  return new Promise(async resolve => {
    const animationTimeout = setTimeout(() => {
      resolve()
    }, ANIMATION_TIMEOUT + SCROLL_CENTER_TIMER)

    document.querySelector('body').classList.add('scroll-lock')

    if (withScrollCenter) {
      await scrollToElementCenter(container, SCROLL_CENTER_TIMER)
    }

    const b = container.getBoundingClientRect()
    const first = {
      ...{},
      top: b.top,
      left: b.left,
      width: b.width,
      height: b.height,
    }

    // Create empty static placeholder and add it
    const placeholder = document.createElement('div')
    placeholder.style.width = `${first.width}px`
    placeholder.style.height = `${first.height}px`
    container.parentNode.appendChild(placeholder)

    document.querySelector('body').appendChild(container)

    // The initial state of our transition
    container.style.position = 'fixed'
    container.style.top = `${first.top}px`
    container.style.left = `${first.left}px`
    container.style.width = `${first.width}px`
    container.style.height = `${first.height}px`
    await waitForRequestAnimationFrame()

    container.classList.add('fullscreen')
    container.id = CASE_ANIMATION_CONTAINER_ID

    const parentHeight = isMobile(window.navigator.userAgent).apple.phone
      ? window.innerHeight
      : window.innerHeight
    const deltaW = window.innerWidth / first.width
    const deltaH = parentHeight / first.height

    let x = 0
    let y = 0
    let scale = 0

    if (deltaH > deltaW) {
      scale = deltaH
      const fullWidth = scale * first.width
      const widthIncrease = fullWidth - window.innerWidth
      x = 0 - widthIncrease / 2
    } else {
      scale = deltaW
      const fullHeight = scale * first.height
      const heightIncrease = fullHeight - parentHeight
      y = 0 - heightIncrease / 2
    }
    x = x - first.left
    y = y - first.top
    await waitForRequestAnimationFrame()

    // const anime = await deferredCallbacks.anime()
    // anime({
    //   targets: container,
    //   translateX: x,
    //   translateY: y,
    //   scale: scale,
    //   easing: 'easeInQuint',
    // })
    container.style.transform = `
      translate(${x}px, ${y}px)
      scale(${scale})
    `

    await waitForTransition(container)
    await waitForIdle()

    loaderIndicatorTimeout = setTimeout(() => {
      document.getElementById(CASE_INDICATOR_ID).classList.add('show')
    }, 1000)

    container.classList.add(classStates.TRANSITION_COMPLETE)
    setPageOpacity(0)
    window.scrollTo(0, 0)
    await waitForRequestAnimationFrame()

    unstable_next(() => {
      clearTimeout(animationTimeout)
      resolve()
    })
  })
}

export const resetContainerStyle = (container: MediaElement) => {
  container.style.top = '0px'
  container.style.left = '0px'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.position = 'relative'
  container.style.transform = 'none'
}
