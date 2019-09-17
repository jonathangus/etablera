import React from 'react'
import SEO from '../components/Seo'

import CasePage from '../components/cases/CasePage'
import { graphql } from 'gatsby'
import get from 'lodash/get'

const Page = ({ data }) => {
  const item = data.contentfulCase
  const description = get(item, 'description.content[0].content[0].value') // Cmon what is this

  return (
    <React.Fragment>
      <SEO
        title={item.name}
        description={description}
        image={item.mainImage.localFile.publicURL}
      />
      <CasePage record={item} relatedCases={data.related.nodes} />
    </React.Fragment>
  )
}

export const query = graphql`
  query($id: String, $locale: String, $relatedCases: [String]) {
    contentfulCase(id: { eq: $id }, node_locale: { eq: $locale }) {
      ...caseCriticalData
      ...caseSections
      description {
        content {
          content {
            value
          }
        }
      }
    }
    related: allContentfulCase(filter: { id: { in: $relatedCases } }) {
      nodes {
        ...caseCriticalData
      }
    }
  }
`

export default Page
