import React, { useEffect, useRef, useMemo, memo } from 'react'
import styled from 'styled-components'
import { $pageTitle } from '../../utils/dom-selectors'
import PageLoaderLayout from './PageLoaderLayout'
import OGLCanvas, { IOGLCanvas } from './OGLCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useUiContext } from '../../contexts/UiContext'

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

const TitleCanvas = () => {
  const wrapperEl = useRef<HTMLElement>()
  const canvasRef = useRef<HTMLCanvasElement>()
  const oglCanvas = useRef<IOGLCanvas>()
  const innerEl = useRef<HTMLElement>()
  const { selected } = useThemeContext()
  const { etableraSmooth } = useUiContext()

  useEffect(() => {
    if (etableraSmooth)
      // TODO ts
      etableraSmooth.appendCanvas(wrapperEl.current, oglCanvas.current)
  }, [etableraSmooth])

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

    if (etableraSmooth) {
      etableraSmooth.appendCanvas(wrapperEl.current, oglCanvas.current)
    }

    return () => {
      oglCanvas.current.destroy()
    }
  }, [selected])

  return (
    <PageLoaderLayout ref={wrapperEl}>
      <Inner ref={innerEl}>
        <canvas data-lol ref={canvasRef} />
      </Inner>
    </PageLoaderLayout>
  )
}

export default memo(TitleCanvas)
