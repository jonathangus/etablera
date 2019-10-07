import React, { useEffect, useRef, useMemo, memo } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import { $mainHero, $pageTitle } from '../../utils/dom-selectors'
import PageLoaderLayout from './PageLoaderLayout'
import { ISmoothItem } from '../../utils/scroll/SmoothItem'
import OGLCanvas, { IOGLCanvas } from './OGLCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'

const Inner = styled.div`
  height: 100%;
  width: 100%;
  background: ${p => p.theme.backgroundColor};
  transition: ${p => p.theme.transition};

  canvas {
    width: 100%;
    height: 100%;
    background: ${p => p.theme.backgroundColor};
    transition: ${p => p.theme.transition};
  }
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
  const { selected } = useThemeContext()

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
      selected,
      parentNode: innerEl.current,
    })

    return () => {
      console.log('REMOVE')
      oglCanvas.current.destroy()
    }
  }, [selected])

  if (!portalEl.current) return null

  const content = useMemo(
    () => (
      <PageLoaderLayout ref={wrapperEl}>
        <Inner ref={innerEl}>
          <canvas ref={canvasRef} />
        </Inner>
      </PageLoaderLayout>
    ),
    []
  )

  return createPortal(content, portalEl.current)
}

export default TitleCanvas
