import React from 'react'
import styled from 'styled-components'
import CaseHeader from './CaseHeader'
import CaseContent from './CaseContent'
import { ICase } from '../../types'
import { CasePageContextProvider } from '../../contexts/CasePageContext'
import RelatedCases from './RelatedCases'

const Container = styled.div`
  height: 100%;
`

type Props = {
  record: ICase
  relatedCases: ICase[]
}

const CasePage = ({ record, relatedCases }: Props) => {
  return (
    <CasePageContextProvider>
      <Container>
        <CaseHeader record={record} />
        <CaseContent record={record} />
        <RelatedCases relatedCases={relatedCases} />
      </Container>
    </CasePageContextProvider>
  )
}

export default CasePage
