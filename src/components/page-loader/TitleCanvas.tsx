import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { $mainHero } from '../../utils/dom-selectors'
import PageLoaderLayout from './PageLoaderLayout'
import { ISmoothItem } from '../../utils/scroll/SmoothItem'
import OGLCanvas from './OGLCanvas'

const Container = styled.canvas`
  width: 100%;
  height: 100%;
`

type Props = {
  smooth: ISmoothItem
}

const TitleCanvas = ({ smooth }: Props) => {
  const portalEl = useRef<HTMLElement>($mainHero.resolve())
  const canvasRef = useRef<HTMLElement>()
  const oglCanvas = useRef()

  useEffect(() => {
    portalEl.current = $mainHero.resolve()
  })

  useEffect(() => {
    if (smooth) smooth.appendCanvas(canvasRef.current)
  }, [smooth])

  useEffect(() => {
    oglCanvas.current = new OGLCanvas(canvasRef.current)

    return () => {
      oglCanvas.current.destroy()
    }
  }, [])

  if (!portalEl.current) return null

  return createPortal(
    <PageLoaderLayout>
      <Container ref={canvasRef}></Container>
    </PageLoaderLayout>,
    portalEl.current
  )

  return
}

export default TitleCanvas
