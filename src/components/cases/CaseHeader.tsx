import React, { useRef } from 'react'
import styled from 'styled-components'
import CaseMedia from './CaseMedia'
import { ICase } from '../../types'
import CaseTitle from './CaseTitle'
import ScrollIndicator from '../ScrollIndicator'
import { useCasePageContext } from '../../contexts/CasePageContext'
import { scrollToOffset } from '../../utils/scroll'
import { useUiContext } from '../../contexts/UiContext'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import { $headerTextDiff, $caseHeader } from '../../utils/dom-selectors'

const Container = styled.div<{ loaded: boolean }>`
  height: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

type Props = {
  record: ICase
}
const CaseHeader = ({ record }: Props) => {
  const containerRef = useRef()
  const { idle, title } = useCasePageContext()
  const {
    showHeader,
    headerShown,
    ignoreDefaultHeaderAnimation,
  } = useUiContext()

  const scrollIt = async () => {
    if (window.pageYOffset === 0) await scrollToOffset(120, 650)
    setTimeout(() => {
      showHeader()
    }, 200)
  }

  useScheduleEffect(
    () => {
      ignoreDefaultHeaderAnimation()

      if (title) {
        scrollIt()
      }
    },
    [title],
    SchedulePrio.Normal
  )

  return (
    <Container
      {...$headerTextDiff.attr}
      {...$caseHeader.attr}
      ref={containerRef}
    >
      <CaseMedia id="case-page-media" detailPage autoPlay item={record} />
      <CaseTitle client={record.client} title={record.name} />
      {idle && headerShown && <ScrollIndicator color="white" />}
    </Container>
  )
}

export default CaseHeader
