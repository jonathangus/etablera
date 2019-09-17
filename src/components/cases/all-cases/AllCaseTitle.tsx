import React from 'react'
import styled from 'styled-components'
import { gutter } from '../../../vars'
import { ICase } from '../../../types'

const Content = styled.div`
  margin: ${gutter}px;
  position: absolute;
  width: 100%;
  bottom: ${gutter}px;
  left: ${gutter}px;
  z-index: 101;
  color: white;
  pointer-events: none;
`

export const Title = styled.h2`
  color: white;
  text-transform: uppercase;
  margin-bottom: 0;
`
export const Client = styled.h4``

type Props = {
  record: ICase
}

const AllCaseTitle = ({ record }: Props) => {
  return (
    <Content>
      <Title>{record.name}</Title>
      <Client> {record.client}</Client>
    </Content>
  )
}

export default AllCaseTitle
