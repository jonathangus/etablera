import React from 'react'
import { Helmet } from 'react-helmet-async'

const preconnectLinks = ['https://player.vimeo.com']

const Head = () => {
  return (
    <Helmet>
      {preconnectLinks.map((href, i) => (
        <link key={i} href={href} rel="preconnect" crossOrigin="" />
      ))}

      <meta
        name="viewport"
        content="shrink-to-fit=no,viewport-fit=cover, width=device-width, height=device-height"
      />
    </Helmet>
  )
}

export default Head
