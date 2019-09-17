import React, { useRef, useMemo, createRef } from 'react'
import styled from 'styled-components'
import { gutter, easeInCubic } from '../../vars'
import { ICase } from '../../types'
import { slugify } from '../../utils/url'
import { useSetting } from '../../contexts/SettingsContext'
import OverflowAnimation from '../OverflowAnimation'
import useScrollDisplay from '../../hooks/useScrollDisplay'
import CaseLink from './CaseLink'
import Grid from '../Grid'

const StyledCaseLink = styled(CaseLink)`
  transform: translateY(-50%);
  top: 50%;
  height: 100%;
`

const OverflowWrapper = styled.div`
  overflow: hidden;
`

const Item = styled.div`
  width: calc(50% - ${gutter}px);
  height: 300px;
  position: relative;
  overflow: hidden;

  &:hover ${StyledCaseLink} {
    transform: translateY(-50%) scale(1.1);
  }
`

const Container = styled.div`
  padding: 15vh 0;
`

const Title = styled.div`
  text-align: center;
  margin-bottom: ${gutter * 3}px;
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  transform: translateY(${p => (p.show ? 0 : 100)}%);
  transition: transform cubic-bezier(0.8, 0, 0.2, 1) 1s;
  transition-delay: 250ms;
`

type Props = {
  relatedCases: ICase[]
}

const RelatedCases = ({ relatedCases }: Props) => {
  const containerEl = useRef()
  const show = useScrollDisplay(containerEl)
  const t = useSetting()

  const selectedCases = relatedCases.map(c => ({
    ...c,
    href: `/${slugify(c.name)}`,
  }))

  return (
    <Container ref={containerEl}>
      <Grid>
        <Title size={0.5}>
          <OverflowAnimation
            show={show}
            as="h2"
            content={t('relatedCases.title')}
          />
        </Title>
        <OverflowWrapper>
          <Inner show={show}>
            {selectedCases.map(record => (
              <Item key={record.id}>
                <StyledCaseLink record={record} />
              </Item>
            ))}
          </Inner>
        </OverflowWrapper>
      </Grid>
    </Container>
  )
}

export default RelatedCases
