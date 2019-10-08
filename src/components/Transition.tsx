import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  children: JSX.Element
  pathname: string
}
const Transition = ({ children, pathname }: Props) => {
  const variants = {
    exit: () => {
      if (typeof window !== 'undefined' && window.shouldAnimate === false) {
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
      if (typeof window !== 'undefined' && window.shouldAnimate === false) {
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
