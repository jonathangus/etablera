require('dotenv').config()

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.etablera.co`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        esModuleInterop: true,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: true,
        // displayName: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `images`,
        path: `${__dirname}/images`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },

    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Etablera`,
        short_name: `etablera`,
        start_url: `/?pwa`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/PageLayout.tsx`),
      },
    },

    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },

    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://etablera.co',
        sitemap: 'https://etablera.co/sitemap.xml',
        policy: [{ userAgent: '*', disallow: ['/.netlify/'] }],
      },
    },
    'gatsby-plugin-optimize-svgs',
    // {
    //   resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    //   options: {
    //     devMode: true,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/sw.js': ['Cache-Control: public, no-cache'],
          '*.js': ['Cache-Control: public, max-age=31449600'],
          '*.css': ['Cache-Control: public, max-age=31449600'],
          '*.woff2': ['Cache-Control: public, max-age=31449600'],
          '*.woff': ['Cache-Control: public, max-age=31449600'],
        },
      },
    },

    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Poppins`,
            variants: ['400', '700', '800'],
          },
          {
            family: 'Livvic',
            variants: ['300', '400'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      // options: {
      //   runtimeCaching: [
      //     {
      //       // Use cacheFirst since these don't need to be revalidated (same RegExp
      //       // and same reason as above)
      //       urlPattern: /(\.js$|\.css$|static\/)/,
      //       handler: `NetworkFirst`,
      //     },
      //     {
      //       // page-data.json files are not content hashed
      //       urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
      //       handler: `NetworkFirst`,
      //     },
      //     {
      //       // Add runtime caching of various other page resources
      //       urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
      //       handler: `StaleWhileRevalidate`,
      //     },
      //     {
      //       // Google Fonts CSS (doesn't end in .css so we need to specify it)
      //       urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
      //       handler: `StaleWhileRevalidate`,
      //     },
      //   ],
      // },
    },
  ],
}
