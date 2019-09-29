import React from 'react'
import SEO from '../components/Seo'
import CaseList from '../components/cases/CaseList'
import SiteIntro from '../components/SiteIntro'
import AboutImage from '../components/landing/AboutImage'
import LogoWall from '../components/landing/LogoWall'
import CodeArea from '../components/CodeArea'
import MainHero from '../components/landing/MainHero'
import { useSetting } from '../contexts/SettingsContext'
import { graphql } from 'gatsby'
import PageLoader from '../components/page-loader/PageLoader'

const IndexPage = ({ pageContext, data }) => {
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.home.title')}
        description={t('meta.home.description')}
      />
      {/* <PageLoader isFrontpage={true} /> */}
      <MainHero />
      <SiteIntro />
      <CaseList cases={data.cases.nodes} />
      <LogoWall />
      <CodeArea />
      <AboutImage />
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
