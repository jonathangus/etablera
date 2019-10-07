import React from 'react'
import SEO from '../components/Seo'
import AllCases from '../components/cases/all-cases/AllCases'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'

const AboutPage = ({ data }) => {
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.about.title')}
        description={t('meta.about.description')}
      />
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

export default AboutPage
