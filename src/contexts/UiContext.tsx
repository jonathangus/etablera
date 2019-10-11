import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useRef,
} from 'react'
import { IUiContext } from '../types'

const UiContext = createContext(null as IUiContext)

type Props = { children: JSX.Element; isFrontpage: boolean }

const UiContextProvider = ({ children, isFrontpage }: Props) => {
  const [headerShown, setHeaderShown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
  const [frontpageLoaded, setFrontpageLoaded] = useState(false)
  const [pageTransitionActive, setPageTransitionActive] = useState(false)
  const [etableraSmooth, setEtableraSmooth] = useState()
  const ignoreDefaultHeaderAnimation = useRef(false)

  useEffect(() => {
    animateContent &&
      !ignoreDefaultHeaderAnimation.current &&
      setHeaderShown(true)
  }, [animateContent])

  const value = {
    mounted,
    animateContent,
    setMounted: () => {
      setMounted(true)
      setTimeout(() => {
        document.querySelector('body').classList.add('scroll')
        setAnimateContent(true)
      }, 900)
    },
    setEtableraSmooth,
    etableraSmooth,
    showHeader: () => {
      ignoreDefaultHeaderAnimation.current = false
      setHeaderShown(true)
    },
    hideHeader: () => setHeaderShown(false),
    headerShown,
    frontpageLoaded,
    setFrontpageLoaded: () => setFrontpageLoaded(true),
    pageTransitionActive,
    setPageTransitionActive: (active: boolean) =>
      setPageTransitionActive(active),
    showTitleCanvas: isFrontpage && animateContent,
    ignoreDefaultHeaderAnimation: () => {
      ignoreDefaultHeaderAnimation.current = true
    },
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

const useUiContext = (): IUiContext => useContext(UiContext)

export { UiContextProvider, useUiContext, UiContext }
