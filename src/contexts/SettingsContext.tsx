// @flow

import React, { createContext, useContext, useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { ISettingsContext, ContentfulEdge, ContentfulNode } from '../types'

const SettingsContext = createContext(null as ISettingsContext)

type Props = {
  children: any
  locale: 'sv-SE' | 'en-US'
  currPath: string
}

function SettingsContextProvider({ locale, children, currPath }: Props) {
  // const [currentChildren, setChildren] = useState(children)
  const data = useStaticQuery(graphql`
    {
      allContentfulSetting {
        edges {
          node {
            id
            key
            node_locale
            value {
              value
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `)

  const nodes = data.allContentfulSetting.edges
    .map((e: ContentfulEdge) => e.node)
    .filter((n: ContentfulNode) => n.node_locale === locale)

  const t = (key: string, withHtml: boolean) => {
    const match = nodes.find(n => n.key === key)
    if (!match) {
      console.warn('cant find ', key)
      return key
    }

    if (withHtml) {
      return get(match, 'value.childMarkdownRemark.html')
    }
    return match.value.value
  }

  const isSwedish = locale === 'sv-SE'
  t.url = (url: string) => {
    if (!url.startsWith('/')) throw new Error('Needs to start with /')

    return isSwedish ? url : `/en${url}`
  }
  t.translate = () => (isSwedish ? `/en${currPath}` : currPath)
  t.currentLanguage = locale
  t.isSwedish = isSwedish
  return (
    <SettingsContext.Provider value={t}>{children}</SettingsContext.Provider>
  )
}

const SettingsContextConsumer = SettingsContext.Consumer

const useSetting = (): ISettingsContext => useContext(SettingsContext)

export {
  SettingsContext,
  SettingsContextProvider,
  SettingsContextConsumer,
  useSetting,
}
