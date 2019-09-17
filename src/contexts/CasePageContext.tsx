import React, {
  useState,
  useContext,
  createContext,
  useLayoutEffect,
} from 'react'
import { ICasePageContext } from '../types'
import {
  cleanUpCaseAnimation,
  setPageOpacity,
} from '../animation/page-animation'
import useRequestIdleCb from '../hooks/useRequestIdleCb'
import { css } from 'styled-components'
import useScheduleEffect from '../hooks/useScheduleEffect'

const contentShowCss = css``
const contentHideCss = css``

const CasePageContext = createContext(null as ICasePageContext)

const CasePageContextProvider = ({ children }: { children: JSX.Element }) => {
  const [state, setState] = useState({
    idle: false,
    title: false,
    content: false,
  })
  const requestIdleCallback = useRequestIdleCb()

  const set = (key: string, value: boolean) => {
    requestIdleCallback(() => {
      setState(curr => ({
        ...curr,
        [key]: value,
      }))
    })
  }

  useLayoutEffect(() => {
    setPageOpacity(1)
  })

  useScheduleEffect(() => {
    cleanUpCaseAnimation()
    set('idle', true)
  }, [])

  const value = {
    contentHideCss,
    contentShowCss,
    idle: state.idle,
    title: state.title,
    content: state.content,
    titleComplete: () => {
      set('title', true)
    },
    showContent: () => {
      set('content', true)
    },
  }

  return (
    <CasePageContext.Provider value={value}>
      {children}
    </CasePageContext.Provider>
  )
}

const useCasePageContext = (): ICasePageContext => useContext(CasePageContext)

export { CasePageContextProvider, useCasePageContext, CasePageContext }
