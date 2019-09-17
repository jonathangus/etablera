import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { logo } from '../svg'
import { darkBg } from '../vars'

const Container = styled.div`
  height: 100vh;
  background: ${darkBg};
  background: ${p => p.theme.color};
`

const Logo = styled.div`
  display: inline-block;
  fill: ${p => p.theme.backgroundColor};
  svg {
    width: 200px;
  }
`

const rand = max => Math.floor(Math.random() * max)
const randColor = () => `rgb(${rand(256)}, ${rand(256)}, ${rand(256)})`

const DVD_LOGO_WIDTH = 100
const DVD_LOGO_HEIGHT = 50

const BounceLogo = () => {
  const logoRef = useRef<HTMLElement>()

  useEffect(() => {
    let posX = 0
    let posY = 0
    const changeXMag = 3
    const changeYMag = 3
    let changeX = changeXMag
    let changeY = changeYMag

    const { height, width } = logoRef.current.getBoundingClientRect()
    const tick = () => {
      if (!logoRef.current) return

      posX += changeX
      posY += changeY
      const isRight = posX >= window.innerWidth - width
      const isLeft = posX <= 0
      const isTop = posY <= 0
      const isBottom = posY >= window.innerHeight - height
      const isHorizontalBoundary = isLeft || isRight
      const isVerticalBounday = isTop || isBottom
      if (isHorizontalBoundary && isVerticalBounday) {
        return
      }
      if (isHorizontalBoundary) {
        changeX *= -1
        logoRef.current.style.fill = randColor()
      }
      if (isVerticalBounday) {
        changeY *= -1
        logoRef.current.style.fill = randColor()
      }
      logoRef.current.style.transform = `translate(${posX}px, ${posY}px)`
      requestAnimationFrame(tick)
    }

    tick()
  }, [])
  return (
    <Container>
      <Logo ref={logoRef}>{logo}</Logo>
    </Container>
  )
}

export default BounceLogo
