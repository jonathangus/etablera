const path = require('path')
const { slugify } = require('./src/utils/url')

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.includes('404')) {
    return Promise.resolve()
  }

  return new Promise(resolve => {
    const newPath = page.path === '/' ? '/' : page.path.slice(0, -1)
    const newPage = {
      ...page,
      path: `/en${newPath}`,
      context: { locale: 'en-US' },
    }
    const newPage2 = {
      ...page,
      path: newPath,
      context: { locale: 'sv-SE' },
    }
    deletePage(page)
    createPage(newPage)
    createPage(newPage2)
    resolve()
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allContentfulCase(sort: { fields: [weight], order: ASC }) {
        nodes {
          name
          id
          node_locale
        }
      }
    }
  `)

  const template = path.resolve('src/templates/case.tsx')

  const { nodes } = pages.data.allContentfulCase

  nodes.forEach(node => {
    const availableNodes = nodes.filter(
      relatedNode => relatedNode.node_locale === node.node_locale
    )

    const index = availableNodes.findIndex(n => n.id === node.id)
    const nextCase = availableNodes[index + 1] || availableNodes[0]
    const prevCase =
      availableNodes[index - 1] || availableNodes[availableNodes.length - 1]

    const relatedCases = [prevCase.id, nextCase.id]

    // Only care about the default pages
    if (node.node_locale === 'sv-SE') {
      createPage({
        path: `/${slugify(node.name)}`,
        component: template,
        context: {
          id: node.id,
          locale: 'sv-SE',
          isCasePage: true,
          relatedCases,
        },
      })
    } else {
      createPage({
        path: `/en/${slugify(node.name)}`,
        component: template,
        context: {
          id: node.id,
          locale: 'en-US',
          isCasePage: true,
          relatedCases,
        },
      })
    }
  })
}
