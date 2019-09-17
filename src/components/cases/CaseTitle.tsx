import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { gutter, easeInCubic } from '../../vars'
import { useCasePageContext } from '../../contexts/CasePageContext'
import useChillEffect from '../../hooks/useChillEffect'
import media from '../../media'
import OverflowAnimation from '../OverflowAnimation'
import { useUiContext } from '../../contexts/UiContext'
import Grid from '../Grid'

const Container = styled.div<{ extraCss: any; show: boolean }>`
  position: absolute;
  z-index: 20;
  padding: ${gutter * 2}px 0;
  overflow: hidden;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);

  ${media.phone`
    padding-bottom: ${p => gutter * 6}px;
  `}

  h1 {
    color: #fff;
    position: relative;
    z-index: 40;
    font-size: 8rem;
    max-width: 1000px;
    line-height: 0.7;

    ${media.tablet`
      font-size: 5rem;
    `}

    ${media.phone`
      font-size: 4rem;
    `}
    
    .word {
      opacity: 1 !important;
      animation-timing-function: cubic-bezier(0.2, 1, 0.3, 1) !important;
      animation-duration: 2700ms !important;
    }
  }
`

const Client = styled.h3`
  color: white;
  transition: opacity 0.4s ease;
  opacity: ${p => (p.show ? 1 : 0)};
  transition-delay: 300ms;
  margin-top: ${gutter * 4}px;

  ${media.phone`
   margin-top: ${gutter * 2}px;
  `}
`

const Inner = styled.div``

type Props = {
  client?: string
  title: string
}

const CaseTitle = ({ title, client }: Props) => {
  const [show, setShow] = useState(false)
  const casePageContext = useCasePageContext()
  const { mounted, animateContent } = useUiContext()

  useChillEffect(() => {
    setShow(true)
  }, [])

  const onStart = () => {
    setTimeout(() => {
      casePageContext.titleComplete()
    }, 1000)

    setTimeout(() => {
      casePageContext.showContent()
    }, 2000)
  }

  return (
    <Container show={show}>
      <Grid>
        <Inner>
          <OverflowAnimation
            as="h1"
            withOpacity={false}
            onStart={onStart}
            show={mounted && casePageContext.idle && animateContent}
            content={title}
          />
        </Inner>

        <Client show={casePageContext.title}>{client}</Client>
      </Grid>
    </Container>
  )
}

export default CaseTitle
