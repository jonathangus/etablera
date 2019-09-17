import React from 'react'
import styled from 'styled-components'
import { gutter } from '../vars'
import media from '../media'

const Grid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${gutter * 3}px;

  ${media.tablet`
    padding: 0 ${gutter * 2}px;
  `}

  ${media.phone`
    padding: 0 ${gutter * 1}px;
  `}
`
export default Grid
