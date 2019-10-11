import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { unstable_next } from 'scheduler'
import isMobile from 'ismobilejs'
import { useUiContext } from '../contexts/UiContext'

type Props = {
  children: JSX.Element
  pathname: string
  pageContext: {
    isCasePage?: boolean
  }
}
const Transition = ({ children, pathname, pageContext }: Props) => {
  const { hideHeader, setFrontpageLoaded } = useUiContext()
  const ignoreAnimate = () =>
    typeof window !== 'undefined' && window.shouldAnimate === false

  useEffect(() => {
    return () => {
      setFrontpageLoaded(false)
    }
  }, [pathname])

  useEffect(() => {
    if (pageContext.isCasePage) {
      hideHeader()
    }
  }, [pageContext.isCasePage])

  if (
    typeof window !== 'undefined' &&
    isMobile(window.navigator.userAgent).apple.phone
  ) {
    return children
  }

  const variants = {
    exit: () => {
      if (ignoreAnimate()) {
        return {
          opacity: 1,
          transition: {
            duration: 0,
          },
        }
      }
      return {
        opacity: 0,
        transition: { duration: 0.35 },
      }
    },
    enter: () => {
      if (ignoreAnimate()) {
        return {
          opacity: 1,
          transition: {
            duration: 0,
          },
        }
      }
      return {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
        },
      }
    },
  }

  // Take care of page scroll
  const onExitComplete = () => {
    window.scrollTo(0, 0)

    unstable_next(() => {
      setTimeout(() => {
        window.shouldAnimate = true
      }, 100)
    })
  }

  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={onExitComplete}
      initial={false}
    >
      <motion.div
        initial="enter"
        exit="exit"
        animate="enter"
        variants={variants}
        key={pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(Transition)
