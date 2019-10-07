import React from 'react'
import SEO from '../components/Seo'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'
import AboutHeader from '../components/about/AboutHeader'
import AboutOutro from '../components/about/AboutOutro'
import Services from '../components/about/Services'
import { IService } from '../types'

const AboutPage = ({ data }) => {
  const t = useSetting()
  const services: Array<IService> = data.services.nodes

  return (
    <React.Fragment>
      <SEO
        title={t('meta.about.title')}
        description={t('meta.about.description')}
      />
      <AboutHeader></AboutHeader>
      <Services items={services} />
      <AboutOutro />
    </React.Fragment>
  )
}

export const query = graphql`
  query($locale: String) {
    services: allContentfulService(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [weight], order: ASC }
    ) {
      nodes {
        name
        body {
          childMarkdownRemark {
            html
          }
        }
      }
    }

    cases: allContentfulCase(
      filter: { node_locale: { eq: $locale } }
      sort: { fields: [weight], order: ASC }
    ) {
      ...caseNodes
    }
  }
`

export default AboutPage
