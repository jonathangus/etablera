import React, { forwardRef } from 'react'
import styled from 'styled-components'
import media from '../media'

type Props = {
  size?: number
  children: JSX.Element
  className?: string
  bottom?: boolean
  top?: boolean
}

const Container = styled.div`
  margin-bottom: ${p => (p.bottom ? p.size * 15 : 0)}vh;
  margin-top: ${p => (p.top ? p.size * 15 : 0)}vh;

  ${media.phone`
    margin-bottom: ${p => (p.bottom ? p.size * 10 : 0)}vh;
    margin-top: ${p => (p.top ? p.size * 10 : 0)}vh;

  `}
`

const YFactor = (
  { size = 1, bottom = true, top = false, children, className, ...rest }: Props,
  ref
) => (
  <Container
    ref={ref}
    bottom={bottom}
    top={top}
    className={className}
    size={size}
    {...rest}
  >
    {children}
  </Container>
)

export default forwardRef(YFactor)
