import React from 'react'
import styled from 'styled-components'
import Case from './Case'
import media from '../../media'
import Grid from '../Grid'
import YFactor from '../YFactor'
import { ICase } from '../../types'

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

type Props = {
  cases: Array<ICase>
}

const CaseList = ({ cases }: Props) => {
  return (
    <Wrapper top>
      <StyledGrid>
        {cases.map(item => (
          <Item size={0.25} key={item.id}>
            <Case record={item} />
          </Item>
        ))}
      </StyledGrid>
    </Wrapper>
  )
}

export default CaseList
