import React from 'react'
import styled from 'styled-components'
import { gutter, titleFont } from '../vars'
import HalfTextSplit from './HalfTextSplit'

const Container = styled.button`
  -webkit-appearance: none;
  padding: ${gutter / 2}px ${gutter * 2}px;
  background: none;
  font-family: ${titleFont};
  font-weight: bold;
  background: ${p => (p.primary ? p.theme.color : p.theme.backgroundColor)};
  color: ${p => (p.primary ? p.theme.backgroundColor : p.theme.color)};
  font-size: 1.1rem;
  cursor: pointer;
  border: 1px solid
    ${p => (p.primary ? p.theme.backgroundColor : p.theme.color)};
  transition: transform 0.4s ease-in;

  --half-text-split-color: ${p =>
    p.primary ? p.theme.backgroundColor : p.theme.color};
`

type Props = {
  text: string
  onClick: () => void
  primary?: boolean
}

const Button = ({ text, onClick, primary = true, ...rest }: Props) => {
  return (
    <Container primary={primary} onClick={onClick} {...rest}>
      <HalfTextSplit text={text} />
    </Container>
  )
}

export default Button
