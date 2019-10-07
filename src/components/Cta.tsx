import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { titleFont, semi } from '../vars'

const Container = styled.div`
  font-size: 1.3rem;
  font-family: ${titleFont};
  font-weight: ${semi};
`

type Props = {
  children: any
  onClick?: () => void
  href?: string
}

const Cta = ({ children, href, ...rest }: Props) => {
  const as = href ? Link : 'div'

  return (
    <Container {...rest} as={as} to={href}>
      {children}
    </Container>
  )
}

export default Cta
