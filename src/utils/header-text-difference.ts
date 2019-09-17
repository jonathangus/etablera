import { $headerTextDiff, $header } from './dom-selectors'

// WIP
class HeaderTextDifference {
  items: HTMLElement[] = []
  observers: IntersectionObserver[] = []
  iterationCount = 0

  destroy = () => {
    if (this.observers.length) {
      this.observers.forEach((observer, i) => observer.unobserve(this.items[i]))
    }
    this.observers = []
  }

  public onRouteChange = () => {
    this.iterationCount = 0
    this.destroy()

    this.items = $headerTextDiff.resolveAll()

    this.items.forEach((item: HTMLElement, i) => {
      this.observers[i] = new IntersectionObserver(this.onIntersection, {
        rootMargin: '-50px',
      })

      this.observers[i].observe(item)
    })

    if (this.items.length === 0) {
      this.onChange(false)
    }
  }

  public onChange = (isLight: boolean) => {}

  private onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (this.iterationCount < this.items.length) {
      entry.isIntersecting && this.onChange(entry.isIntersecting)
    } else {
      this.onChange(entry.isIntersecting)
    }
    this.iterationCount++
  }
}

export default new HeaderTextDifference()
