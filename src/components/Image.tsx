import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components'
import { IGatsbyImage, IImage } from '../types'
import { useState } from 'react'
import get from 'lodash/get'

const Img = styled.img`
  width: 100%;
  display: block;
  left: 0;
  top: 0;

  ${p =>
    !p.loaded &&
    `
     position: absolute;
    height: 100%;
    left: 50%;
    transform: translate(-50%);
  `}
`

const Placeholder = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
  transition: opacity 0.5s ease !important;
  opacity: 1;
  height: auto;
  position: relative;

  ${p =>
    p.loaded &&
    `
    opacity: 0;
    height: 100%;
    position: absolute;
`}
`

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

type Props = {
  image: IGatsbyImage
  onLoad?: Function
  className?: string
  show?: boolean
  alt?: string
}

let imageCache = {}
const getCache = () => {
  const stored = localStorage.getItem('imageCache')
  if (stored) {
    return JSON.parse(stored) || {}
  }
  return {}
}
if (typeof window !== 'undefined') {
  imageCache = getCache()
}

const Image = (
  { image, className = '', onLoad, alt, show = true }: Props,
  ref
) => {
  const selectedImage: IImage = get(
    image,
    'localFile.childImageSharp.fluid',
    image.fluid || image.fixed || image
  )
  const [loaded, setLoaded] = useState(false)
  const altText = alt || (image && image.title)

  useEffect(() => {
    if (loaded) {
      onLoad && onLoad()

      const newCache = getCache()
      newCache[selectedImage.src] = true
      localStorage.setItem('imageCache', JSON.stringify(newCache))
    }
  }, [loaded])

  const onImageLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    if (imageCache[selectedImage.src]) {
      setLoaded(true)
    }
  }, [])

  if (!selectedImage) return
  const showImage = loaded || show
  const imageProps = showImage ? selectedImage : {}

  return (
    <Wrapper className={className} ref={ref}>
      <Placeholder loaded={loaded} src={selectedImage.base64} alt={alt} />
      <picture ref={ref}>
        {selectedImage.srcSetWebp && show && (
          <source
            type={`image/webp`}
            srcSet={selectedImage.srcSetWebp}
            sizes={selectedImage.sizes}
          />
        )}

        <Img
          {...imageProps}
          onLoad={onImageLoad}
          width={selectedImage.width}
          height={selectedImage.height}
          alt={altText}
          loaded={loaded}
        />
      </picture>
    </Wrapper>
  )
}

export default forwardRef(Image)
