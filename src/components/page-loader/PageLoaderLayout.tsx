import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components'
import media from '../../media'

type Props = {
  children: any
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  ${media.phone`
    width: 100%;
  `}
`

const Inner = styled.div`
  height: 0px;
  position: relative;
  padding-top: 100%;
`

const Item = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const PageLoaderLayout = forwardRef(({ children }: Props, ref) => {
  return (
    <Container ref={ref}>
      <Inner>
        <Item>{children}</Item>
      </Inner>
    </Container>
  )
})

export default PageLoaderLayout
