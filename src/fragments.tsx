import { graphql } from 'gatsby'

export const query = graphql`
  fragment footerImage on Query {
    footerImage: file(name: { eq: "bois3" }) {
      childImageSharp {
        fluid(
          maxWidth: 1920
          srcSetBreakpoints: [310, 650, 1280, 1500]
          quality: 98
        ) {
          ...GatsbyImageSharpFluid_withWebp
          aspectRatio
        }
      }
    }
  }

  fragment aboutImage on Query {
    aboutImage: file(name: { eq: "about" }) {
      childImageSharp {
        fluid(
          maxWidth: 1920
          srcSetBreakpoints: [310, 650, 1280, 1500]
          quality: 98
        ) {
          ...GatsbyImageSharpFluid_withWebp
          aspectRatio
        }
      }
    }
  }

  fragment codeScreen on Query {
    codeScreen: file(name: { eq: "screen" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
          aspectRatio
        }
      }
    }
  }

  fragment culture on Query {
    allContentfulCultureVideo(filter: { node_locale: { eq: "sv-SE" } }) {
      nodes {
        fileUrl
      }
    }

    allContentfulCultureImage(filter: { node_locale: { eq: "sv-SE" } }) {
      nodes {
        image {
          title
          fluid(maxWidth: 1800, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }

  fragment caseCriticalData on ContentfulCase {
    name
    client
    id
    node_locale
    weight
    videoUrlDesktop
    videoUrlMobile

    mainImage {
      title

      localFile {
        publicURL

        childImageSharp {
          fluid(maxWidth: 1920, quality: 98) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }

  fragment caseSections on ContentfulCase {
    sections {
      __typename
      ... on ContentfulTextSection {
        title
        body {
          childMarkdownRemark {
            html
          }
        }
        type
        media {
          id
          file {
            contentType
            url
          }
          ... on ContentfulAsset {
            localFile {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1920, quality: 98) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }

          title
        }
      }
      ... on ContentfulSectionImage {
        image {
          title
          fluid(maxWidth: 1920, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }

      ... on ContentfulSectionImageGrid {
        images {
          title
          localFile {
            publicURL
            childImageSharp {
              fluid(maxWidth: 1920, quality: 98) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }

      ... on ContentfulSectionFullVideo {
        vimeoId
        poster {
          title
          fluid(maxWidth: 1920, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }

      ... on ContentfulSectionLooper {
        item
      }

      ... on ContentfulSectionOutro {
        title
        text {
          childMarkdownRemark {
            html
          }
        }
        buttonText
        websiteLink
      }
    }
  }

  fragment cases on Query {
    cases: allContentfulCase(sort: { fields: [weight], order: ASC }) {
      edges {
        node {
          name
          client
          id
          node_locale
          weight
          videoUrlDesktop
          videoUrlMobile
          frontpage
          mainImage {
            title
            localFile {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1920, quality: 98) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }

  fragment caseNodes on ContentfulCaseConnection {
    nodes {
      ...caseCriticalData
    }
  }

  fragment landingImages on Query {
    allContentfulImage(
      filter: { contentfulid: { ne: "Landing" }, node_locale: { eq: "sv-SE" } }
    ) {
      nodes {
        contentfulid
        image {
          id
          fluid(maxWidth: 1920, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }

  fragment logos on Query {
    allContentfulClientLogo(filter: { node_locale: { eq: "sv-SE" } }) {
      nodes {
        name
        id
        light {
          fluid(maxWidth: 400, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        dark {
          fluid(maxWidth: 400, quality: 98) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`
