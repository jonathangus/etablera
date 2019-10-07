import React from 'react'
import styled from 'styled-components'
import Case from './Case'
import media from '../../media'
import Grid from '../Grid'
import YFactor from '../YFactor'
import { ICase } from '../../types'
import { $scrollTarget } from '../../utils/dom-selectors'
import Cta from '../Cta'
import { useSetting } from '../../contexts/SettingsContext'
import { gutter } from '../../vars'

const Wrapper = styled(YFactor)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1300px;

  > div {
    ${media.tablet`
      display:block;
      overflow: hidden;
   `}
  }
`

const StyledGrid = styled(Grid)`
  ${media.phone`
    padding:0;
  `}
`

const Item = styled(YFactor)`
  width: 100%;
`

const CtaWrapper = styled.div`
  text-align: center;
  padding-top: ${gutter * 2}px;
`

type Props = {
  cases: Array<ICase>
}

const CaseList = ({ cases }: Props) => {
  const t = useSetting()
  return (
    <>
      <div {...$scrollTarget.attr} />
      <Wrapper top>
        <StyledGrid>
          {cases.map(item => (
            <Item size={0.25} key={item.id}>
              <Case record={item} />
            </Item>
          ))}
        </StyledGrid>

        <CtaWrapper>
          <Cta href={t.url('/cases/')}>{t('caseList.cta')}</Cta>
        </CtaWrapper>
      </Wrapper>
    </>
  )
}

export default CaseList
