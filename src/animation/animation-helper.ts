import { requestIdleCb } from '../utils'

export const waitForAnimation = (el: HTMLElement): Promise<any> => {
  return new Promise(resolve => {
    const checker = () => {
      el.removeEventListener('animationend', checker)
      resolve()
    }

    el.addEventListener('animationend', checker, false)
  })
}

export const waitForTransition = (el: HTMLElement): Promise<any> => {
  return new Promise(resolve => {
    const checker = () => {
      el.removeEventListener('transitionend', checker)
      resolve()
    }

    el.addEventListener('transitionend', checker, false)
  })
}

export const waitForRequestAnimationFrame = () => {
  return new Promise(resolve => {
    requestAnimationFrame(resolve)
  })
}

export const waitForIdle = () => {
  return new Promise(resolve => {
    requestIdleCb(resolve)
  })
}
