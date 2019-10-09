import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { unstable_next } from 'scheduler'
import isMobile from 'ismobilejs'

type Props = {
  children: JSX.Element
  pathname: string
}
const Transition = ({ children, pathname }: Props) => {
  useEffect(() => {
    window.onpopstate = () => {
      if (isMobile(window.navigator.userAgent).apple.phone) {
        window.shouldAnimate = false
      }
    }
  }, [])

  const ignoreAnimate = () =>
    typeof window !== 'undefined' && window.shouldAnimate === false

  const variants = {
    exit: () => {
      if (ignoreAnimate()) {
        return {
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

    setTimeout(() => {
      unstable_next(() => {
        window.shouldAnimate = true
      })
    }, 300)
  }

  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={onExitComplete}
      initial={false}
    >
      <motion.div
        initial="exit"
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
