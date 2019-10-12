import React, { useEffect, useState, useRef, useMemo } from 'react'
import PageLoaderTitle from './PageLoaderTitle'
import PageLoaderLayout from './PageLoaderLayout'
import { useUiContext } from '../../contexts/UiContext'

type Props = {
  isFrontpage: boolean
  firstComplete: boolean
  setFirstComplete: Function
}

const PageLoaderContent = ({
  firstComplete,
  isFrontpage,
  setFirstComplete,
}: Props) => {
  const titleRef = useRef()
  const { siteAnimationDone } = useUiContext()

  const TitleNode = useMemo(
    () => (
      <PageLoaderTitle
        firstComplete={firstComplete}
        setFirstComplete={setFirstComplete}
      />
    ),
    [firstComplete]
  )

  if (siteAnimationDone && isFrontpage) return null

  return <PageLoaderLayout ref={titleRef}>{TitleNode}</PageLoaderLayout>
}

export default PageLoaderContent
