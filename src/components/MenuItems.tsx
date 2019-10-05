import React from 'react'
import styled from 'styled-components'
import { useSetting } from '../contexts/SettingsContext'
import { Link } from 'gatsby'
import HalfTextSplit from './HalfTextSplit'
import { gutter, titleFont, semi } from '../vars'

const Container = styled.div`
  display: flex;
  font-weight: ${semi};
  font-family: ${titleFont};

  a {
    padding-left: ${gutter * 2}px;

    text-decoration: none;
  }
`

const MenuItems = () => {
  const t = useSetting()
  const items = [
    {
      title: t('meta.cases.title'),
      url: '/cases/',
    },
    {
      title: t('meta.feed.title'),
      url: '/feed/',
    },
  ]
  return (
    <Container>
      {items.map((item, i) => (
        <Link key={i} to={t.url(item.url)}>
          <HalfTextSplit text={item.title} />
        </Link>
      ))}
    </Container>
  )
}

export default MenuItems
