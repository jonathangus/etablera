import React, { useState } from 'react'
import styled from 'styled-components'
import { niceCubic } from '../vars'

const Container = styled.div`
  transform: scale(${p => (p.show ? 1 : 0.7)})
    translateY(${p => (p.show ? 0 : -30)}%) rotate(${p => (p.show ? 0 : -5)}deg);
  transition: all 0.65s ${niceCubic};
  opacity: ${p => (p.show ? 1 : 0)};
  will-change: opacity, transform;
`

type Props = {
  show: boolean
}
const RotateIn = ({ show, ...rest }: Props) => (
  <Container show={show} {...rest}></Container>
)

export default RotateIn
