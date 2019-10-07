import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled.div`
  font-size: 1.3rem;
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
