import React from 'react'
import styled from 'styled-components'
import LazyLoadImage from '../LazyLoadImage'

const Image = styled(LazyLoadImage)`
  max-height: 100%;
  object-fit: cover;
`

const FeedImage = ({ image }) => {
  return <Image image={image} />
}

export default FeedImage
