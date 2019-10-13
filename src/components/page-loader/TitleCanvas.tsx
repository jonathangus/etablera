import React, { useEffect, useRef, useMemo, memo } from 'react'
import styled from 'styled-components'
import OGLCanvas, { IOGLCanvas } from './OGLCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useUiContext } from '../../contexts/UiContext'
import useScheduleEffect from '../../hooks/useScheduleEffect'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background: ${p => p.theme.backgroundColor};
  transition: ${p => p.theme.transition};
`
const Inner = styled(Wrapper)`
  canvas {
    width: 100%;
    height: 100%;
    background: ${p => p.theme.backgroundColor};
    transition: ${p => p.theme.transition};
  }
`

type Props = {
  setCanvasActive: (active: boolean) => void
}
const TitleCanvas = ({ setCanvasActive }: Props) => {
  const wrapperEl = useRef<HTMLElement>()
  const canvasRef = useRef<HTMLCanvasElement>()
  const oglCanvas = useRef<IOGLCanvas>()
  const innerEl = useRef<HTMLElement>()
  const { selected } = useThemeContext()
  const { etableraSmooth, setFrontpageLoaded } = useUiContext()

  useScheduleEffect(() => {
    if (etableraSmooth) {
      // TODO ts
      etableraSmooth.appendCanvas(wrapperEl.current, oglCanvas.current)
    }
  }, [etableraSmooth])

  useScheduleEffect(() => {
    setFrontpageLoaded(true)

    const onReady = () => {
      setCanvasActive(true)
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
      oglCanvas.current && oglCanvas.current.destroy()
      setCanvasActive(false)
    }
  }, [selected])

  return (
    <Wrapper ref={wrapperEl}>
      <Inner ref={innerEl}>
        <canvas ref={canvasRef} />
      </Inner>
    </Wrapper>
  )
}

export default memo(TitleCanvas)
