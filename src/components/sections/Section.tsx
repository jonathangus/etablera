import React, { memo } from 'react'
import TextSection from './TextSection'
import SectionImage from './SectionImage'
import SectionImageGrid from './SectionImageGrid'
import SectionFullVideo from './SectionFullVideo'
import SectionOutro from './SectionOutro'
import YFactor from '../YFactor'
import { $scrollTarget } from '../../utils/dom-selectors'
// import SectionLooper from './SectionLooper'

const components = {
  ContentfulTextSection: TextSection,
  ContentfulSectionImage: SectionImage,
  ContentfulSectionImageGrid: SectionImageGrid,
  ContentfulSectionFullVideo: SectionFullVideo,
  ContentfulSectionOutro: SectionOutro,
  // ContentfulSectionLooper: SectionLooper,
}

type Props = {
  firstSection: boolean
  __typename: any
}
const Section = (props: Props) => {
  const { __typename, firstSection, ...data } = props
  const Comp = components[__typename]
  if (!Comp) {
    console.error({ __typename })
    return null
  }
  const attr = firstSection ? $scrollTarget.attr : {}

  return (
    <YFactor {...attr}>
      <Comp {...data} />
    </YFactor>
  )
}

export default memo(Section)
