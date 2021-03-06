import React from 'react'
import SEO from '../components/Seo'
import AllCases from '../components/cases/all-cases/AllCases'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'

const CasePage = ({ data }) => {
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.cases.title')}
        description={t('meta.cases.description')}
      />
      <AllCases cases={data.cases.nodes} />
    </React.Fragment>
  )
}

export const query = graphql`
  query($locale: String) {
    cases: allContentfulCase(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [weight], order: ASC }
    ) {
      ...caseNodes
    }
  }
`

export default CasePage
