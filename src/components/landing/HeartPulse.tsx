import React, { useMemo, createRef } from 'react'
import styled from 'styled-components'
import deferredCallbacks from '../../utils/deferred-callbacks'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import Heart from '../Heart'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  z-index: 210;
  left: 71.5%;
  top: 42%;
`

const StyledHeart = styled(Heart)`
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
`

const HeartPulse = () => {
  const count = 30
  const refs = useMemo(() => Array.from({ length: count }, () => createRef()), [
    count,
  ])

  const animate = async () => {
    const anime = await deferredCallbacks.anime()
    const windowHeight = window.innerHeight

    const randomMovement = () => anime.random(-5, 5) + 'rem'
    const randomSpeed = () => anime.random(2500, 4000) + 'rem'

    const sharedValues = {
      translateX: [
        { value: randomMovement },
        { value: randomMovement },
        { value: randomMovement },
      ],
      translateY: [
        {
          value: -windowHeight / 4,
        },
        {
          value: -windowHeight / 2,
        },
        {
          value: anime.random(-windowHeight, -windowHeight * 1.4),
        },
      ],
      opacity: [
        { value: 0, duration: 100 },
        { value: 1, duration: 100 },
        { value: 1 },
        { value: 0 },
      ],
      scale: [
        { value: 0, duration: 100 },
        { value: 1, duration: 1000 },
        { value: 1 },
      ],
      easing: 'linear',
      duration: randomSpeed,
    }

    const targets = refs.map(ref => ref.current)

    anime({
      targets,
      loop: true,
      delay: anime.stagger(1000),
      ...sharedValues,
    })
  }

  useScheduleEffect(
    () => {
      animate()
    },
    [],
    SchedulePrio.Idle
  )

  return (
    <Container>
      {refs.map((currRef, i) => (
        <StyledHeart
          color="#fff"
          backgroundColor="#000"
          ref={currRef}
          key={i}
        ></StyledHeart>
      ))}
    </Container>
  )
}

export default HeartPulse
