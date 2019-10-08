import React, { useState, useContext, createContext, useEffect } from 'react'
import { IUiContext } from '../types'

const UiContext = createContext(null as IUiContext)

const isDesktop = () => window.innerWidth > 700

type Props = { children: JSX.Element; isFrontpage: boolean }

const UiContextProvider = ({ children, isFrontpage }: Props) => {
  const [headerShown, setHeaderShown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [animateContent, setAnimateContent] = useState(false)
  const [frontpageLoaded, setFrontpageLoaded] = useState(false)
  const [pageTransitionActive, setPageTransitionActive] = useState(false)
  const [etableraSmooth, setEtableraSmooth] = useState()

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
    showHeader: () => setHeaderShown(true),
    hideHeader: () => setHeaderShown(false),
    headerShown,
    frontpageLoaded,
    setFrontpageLoaded: () => setFrontpageLoaded(true),
    pageTransitionActive,
    setPageTransitionActive: (active: boolean) =>
      setPageTransitionActive(active),
    showTitleCanvas: isFrontpage && animateContent,
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

const useUiContext = (): IUiContext => useContext(UiContext)

export { UiContextProvider, useUiContext, UiContext }
