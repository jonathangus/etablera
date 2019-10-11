import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/Seo'
import MediaWall from '../components/culture/MediaWall'
import CultureHeader from '../components/culture/CultureHeader'
import { useSetting } from '../contexts/SettingsContext'

const CulturePage = ({ data }) => {
  const images = data.allContentfulCultureImage.nodes.map(node => ({
    ...node,
    type: 'image',
  }))
  const items = images
  const t = useSetting()

  return (
    <React.Fragment>
      <SEO
        title={t('meta.feed.title')}
        description={t('meta.feed.description')}
      />
      <MediaWall items={items} />
    </React.Fragment>
  )
}
export const query = graphql`
  {
    ...culture
  }
`

export default CulturePage
