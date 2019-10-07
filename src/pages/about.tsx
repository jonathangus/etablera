import React from 'react'
import SEO from '../components/Seo'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'
import AboutHeader from '../components/about/AboutHeader'

const AboutPage = ({ data }) => {
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.about.title')}
        description={t('meta.about.description')}
      />
      <AboutHeader></AboutHeader>
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
