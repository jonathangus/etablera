import React from 'react'
import styled from 'styled-components'
import CultureReveal from './CultureReveal'
import CultureImage from './FeedImage'
import ColOne from './cols/ColOne'
import ColTwo from './cols/ColTwo'
import ColThree from './cols/ColThree'

const Container = styled.div`
  padding: 10vh 0px;
  margin: 0 auto;
  max-width: 2000px;
`

const getGroups = items => {
  let groupCount = 0
  let totalCount = 0
  const groups = []

  try {
    while (totalCount < items.length) {
      if (groupCount === 0) {
        groups.push({
          component: ColOne,
          items: [...items.slice(totalCount, totalCount + 3)],
        })
        totalCount += 3
        groupCount = 1
      } else if (groupCount === 1) {
        groups.push({
          component: ColTwo,
          items: [...items.slice(totalCount, totalCount + 3)],
        })
        totalCount += 3
        groupCount = 2
      } else if (groupCount === 2) {
        groups.push({
          component: ColThree,
          items: [...items.slice(totalCount, totalCount + 2)],
        })
        totalCount += 2
        groupCount = 0
      } else {
        totalCount = 1000
        continue
      }
    }
  } catch (e) {
    // dead
  }
  return groups
}

const MediaWall = ({ items }) => {
  const groups = getGroups(items)
  const getElement = item => {
    if (!item) return null

    return (
      <CultureReveal>
        {item.type === 'image' && <CultureImage image={item.image} />}
      </CultureReveal>
    )
  }
  return (
    <Container>
      {groups.map((group, i) => {
        const Comp = group.component

        return <Comp key={i} items={group.items} getElement={getElement} />
      })}
    </Container>
  )
}

export default MediaWall
