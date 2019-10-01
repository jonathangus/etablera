import React from 'react'
import { Helmet } from 'react-helmet'
import { useSetting } from '../contexts/SettingsContext'
import socialMediaImage from '../images/social-media.png'

type Props = {
  description?: string
  lang?: string
  meta?: Array<string>
  keywords?: Array<string>
  title: string
  image?: string
}

const SEO = ({
  description,
  lang = 'sv',
  meta = [],
  keywords = [],
  title = '',
  image,
}: Props) => {
  const t = useSetting()
  const metaDescription = description || t('meta.home.description')

  const metaImage = image || socialMediaImage

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | Etablera`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'image',
          content: metaImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          property: 'twitter:image',
          content: metaImage,
        },
        {
          name: `twitter:creator`,
          content: 'jontgus',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

export default SEO
