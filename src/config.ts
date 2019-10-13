import isMobile from 'ismobilejs'

export const staticPageTransition = (): boolean =>
  Boolean(
    typeof window !== 'undefined' && isMobile(window.navigator.userAgent).any
  )
