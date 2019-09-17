import React, { useRef } from 'react'
import styled from 'styled-components'
import Section from '../sections/Section'
import { useCasePageContext } from '../../contexts/CasePageContext'
import { ICase } from '../../types'
import YFactor from '../YFactor'
import ScrollLooper from '../ScrollLooper'

const Container = styled(YFactor)`
  position: relative;
  z-index: 30;
`

type Props = {
  record: ICase
}

const CaseContent = ({ record }: Props) => {
  const containerRef = useRef()
  const { sections = [] } = record
  const { content } = useCasePageContext()

  return (
    <Container ref={containerRef} show={content} top bottom={false}>
      {sections.map((section, i) => (
        <Section firstSection={i === 0} {...section} key={i} />
      ))}
    </Container>
  )
}

export default CaseContent
