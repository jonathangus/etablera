export const requestIdleCb = cb => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      cb()
    })
  } else {
    cb()
  }
}
