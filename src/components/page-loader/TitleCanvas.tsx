import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import {
  $mainHero,
  $pageTitle,
  $frontPageScale,
} from '../../utils/dom-selectors'
import PageLoaderLayout from './PageLoaderLayout'
import { ISmoothItem } from '../../utils/scroll/SmoothItem'
import OGLCanvas, { IOGLCanvas } from './OGLCanvas'

const Container = styled.canvas`
  width: 100%;
  height: 100%;
`
const Inner = styled.div`
  height: 100%;
  width: 100%;
`

type Props = {
  smooth: ISmoothItem
}

const TitleCanvas = ({ smooth }: Props) => {
  const wrapperEl = useRef<HTMLElement>()
  const portalEl = useRef<HTMLElement>($mainHero.resolve())
  const canvasRef = useRef<HTMLCanvasElement>()
  const oglCanvas = useRef<IOGLCanvas>()
  const innerEl = useRef<HTMLElement>()

  useEffect(() => {
    portalEl.current = $mainHero.resolve()
  })

  useEffect(() => {
    if (smooth) smooth.appendCanvas(wrapperEl.current, oglCanvas.current)
  }, [smooth])

  useEffect(() => {
    const onReady = () => {
      // TODO
      setTimeout(() => {
        $pageTitle.resolve().style.opacity = '0'
      }, 100)
    }

    oglCanvas.current = new OGLCanvas(canvasRef.current, {
      onReady,
      parentNode: innerEl.current,
    })

    return () => {
      oglCanvas.current.destroy()
    }
  }, [])

  if (!portalEl.current) return null

  return createPortal(
    <PageLoaderLayout ref={wrapperEl}>
      <Inner ref={innerEl} {...$frontPageScale.attr}>
        <Container ref={canvasRef}></Container>
      </Inner>
    </PageLoaderLayout>,
    portalEl.current
  )
}

export default TitleCanvas
