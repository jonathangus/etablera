import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { gutter } from '../vars'
import { useSetting } from '../contexts/SettingsContext'
import { useThemeContext } from '../contexts/ThemeContext'

const Container = styled.div`
  margin-left: auto;
  position: relative;
`
const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;

  path {
    fill: ${p => p.theme.color};
    transition: fill 0.3s ease;
  }

  svg {
    height: 18px;
    width: 18px;
  }
`
const Message = styled.div<{ show: boolean }>`
  max-width: 220px;
  text-align: right;
  font-size: 0.8rem;
  position: fixed;
  right: ${gutter * 2}px;
  top: calc(100% - ${gutter}px);
  width: 220px;
  pointer-events: none;
  transition-delay: 0.5s ease;
  transform: translateY(${p => (p.show ? 0 : 10)}px);
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
`

const moon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="32"
    viewBox="0 0 30 32"
  >
    <path d="M22.592 21.504q3.36 0 6.56-1.792-1.344 4.64-5.184 7.616t-8.8 2.976q-6.016 0-10.304-4.288T.576 15.68q0-4.928 2.976-8.768t7.584-5.216q-1.792 3.2-1.792 6.56 0 5.504 3.904 9.376t9.344 3.872z" />
  </svg>
)

const ThemeToggle = () => {
  const [show, setShow] = useState(false)
  const clicked = useRef(false)
  const { toggleTheme } = useThemeContext()
  const t = useSetting()

  const showMessage = () => {
    if (clicked.current) return
    setShow(true)
    clicked.current = true

    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  const onClick = () => {
    toggleTheme()
    showMessage()
  }
  return (
    <Container onClick={onClick}>
      <Circle>{moon}</Circle>
      <Message show={show}>{t('themeToggle')}</Message>
    </Container>
  )
}

export default ThemeToggle
