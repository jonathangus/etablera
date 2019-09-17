import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useThemeContext } from '../contexts/ThemeContext'

type Props = {
  src: string
  className?: string
}

const Vid = styled.video`
  object-fit: cover;
  object-position: center;
  max-width: 100%;
`

const Video = ({ src, className }: Props, ref) => {
  const { selected } = useThemeContext()

  return (
    <Vid
      className={className}
      key={selected}
      ref={ref}
      autoPlay
      playsInline
      loop
      muted
    >
      <source src={src} type="video/mp4" />
    </Vid>
  )
}

export default forwardRef(Video)
