import React, { useEffect } from 'react'
import GlobalStyle from '../GlobalStyle'
import Header from '../components/Header'
import styled from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeContextProvider } from '../contexts/ThemeContext'
import { SettingsContextProvider } from '../contexts/SettingsContext'
import { UiContextProvider } from '../contexts/UiContext'
import CaseTransitionIndicator from '../components/cases/TransitionIndicator'
import PageLoader from './page-loader/PageLoader'
import Head from './Head'
import DefferedCallbacks from '../utils/deferred-callbacks'
import { init } from '../utils/scroll/smooth-scroll'
import useScheduleEffect, { SchedulePrio } from '../hooks/useScheduleEffect'
import { pageWrapper } from '../utils/dom-selectors'
import PageTransitionHandler from './PageTransitionHandler'
import { getCleanPath } from '../utils/url'
import Footer from './Footer'
import PwaRefresh from './PwaRefresh'

const PageWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
`

const PageLayout = ({ children, pageContext, location }) => {
  useEffect(() => {
    init()
    DefferedCallbacks.loadPrimaryDependencies()
  }, [])

  useScheduleEffect(() => {
    DefferedCallbacks.loadSecondaryDependencies()
  }, [SchedulePrio.Idle])

  const currPath = getCleanPath(location.pathname)
  const isFrontpage = currPath === '/'
  const showFooter = !['/cases', '/feed'].includes(currPath)

  return (
    <HelmetProvider>
      <PageWrapper {...pageWrapper.attr} id="page-wrapper">
        <ThemeContextProvider>
          <UiContextProvider isFrontpage={isFrontpage}>
            <SettingsContextProvider
              currPath={currPath}
              locale={pageContext.locale}
            >
              <Head />

              <GlobalStyle />

              <Header key={location.pathname} currentPath={currPath} />
              <PageTransitionHandler pathname={location.pathname}>
                <PageLoader isFrontpage={isFrontpage} />
                <main>{children}</main>
                {showFooter && <Footer />}
                <PwaRefresh />
              </PageTransitionHandler>
            </SettingsContextProvider>
          </UiContextProvider>
        </ThemeContextProvider>
      </PageWrapper>

      <CaseTransitionIndicator />

      <div id="extra-cursor"></div>
    </HelmetProvider>
  )
}

export default PageLayout
