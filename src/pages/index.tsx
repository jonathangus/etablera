import React from 'react'
import SEO from '../components/Seo'
import CaseList from '../components/cases/CaseList'
import FrontpageImage from '../components/landing/FrontpageImage'
import LogoWall from '../components/landing/LogoWall'
import MainHero from '../components/landing/MainHero'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'

const IndexPage = ({ pageContext, data }) => {
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.home.title')}
        description={t('meta.home.description')}
      />
      <MainHero />
      <CaseList cases={data.cases.nodes} />
      <LogoWall />
      <FrontpageImage />
    </React.Fragment>
  )
}

export const query = graphql`
  query($locale: String) {
    cases: allContentfulCase(
      filter: { frontpage: { eq: true }, node_locale: { eq: $locale } }
      sort: { fields: [weight], order: ASC }
    ) {
      ...caseNodes
    }
  }
`

export default IndexPage
