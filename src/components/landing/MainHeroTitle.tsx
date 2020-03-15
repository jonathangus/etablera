import React, { useMemo, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import TitleCanvas from '../page-loader/TitleCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import useResize from '../../hooks/useResize'
import { useUiContext } from '../../contexts/UiContext'
import PageLoaderLayout from '../page-loader/PageLoaderLayout'
import PageLoaderTitle from '../page-loader/PageLoaderTitle'
import { sizes } from '../../media'

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`
const MainHeroTitle = () => {
  const titleRef = useRef<HTMLElement>()
  useSmooth(() => new SmoothEtablera(titleRef.current))

  return <PageLoaderTitle ref={titleRef} />
}

export default MainHeroTitle
