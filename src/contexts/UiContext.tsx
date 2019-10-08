import React, { useState, useContext, createContext, useEffect } from 'react'
import { IUiContext } from '../types'

const UiContext = createContext(null as IUiContext)

const UiContextProvider = ({ children }: { children: JSX.Element }) => {
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
  }

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

const useUiContext = (): IUiContext => useContext(UiContext)

export { UiContextProvider, useUiContext, UiContext }
