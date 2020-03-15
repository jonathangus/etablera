import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { gutter } from '../vars'
import { useSetting } from '../contexts/SettingsContext'
import Button from './Button'
import media from '../media'

const ComeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(100%);
    }
    to {
        opacity: 1;
        transform: translateY(0%);
    }
`

const Container = styled.div`
  position: fixed;
  max-width: 400px;
  bottom: ${gutter}px;
  left: ${gutter}px;
  background: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.color};
  padding: ${gutter * 2}px;
  z-index: 500;
  border: 1px solid ${p => p.theme.color};
  display: flex;
  align-items: center;
  animation: ${ComeIn} 0.5s ease forwards;

  ${media.phone`
    right: ${gutter}px;
  `}

  svg {
    width: 20px;
    height: auto;
    fill: ${p => p.theme.color};
  }
`

const Inner = styled.div`
  flex: 1;
`

const Text = styled.div`
  margin-right: ${gutter}px;
  flex: 1;
`

const ButtonRow = styled.div`
  margin-top: ${gutter * 2}px;
  display: flex;

  button:first-child {
    margin-right: ${gutter}px;
  }
`

declare global {
  interface Window {
    setShowPwaRefresh: () => void
  }
}

const PwaRefresh = () => {
  const t = useSetting()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Ugly but quick way for gatsby browser to communitcate with this file.
    window.setShowPwaRefresh = () => {
      setShow(true)
    }
  }, [])

  if (!show) return null
  return (
    <Container>
      <Inner>
        <Text>{t('newupdate.text')}</Text>

        <ButtonRow>
          <Button text="Ok!" onClick={() => window.location.reload(true)} />
          <Button onClick={() => setShow(false)} primary={false} text="Nope" />
        </ButtonRow>
      </Inner>

      <svg
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        width="487.23px"
        height="487.23px"
        viewBox="0 0 487.23 487.23"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <path
              d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61
			c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512
			c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205
			c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332
			c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06
			c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z"
            />
            <path
              d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854
			c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369
			c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089
			c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943
			c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805
			c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059
			C473.197,326.043,471.903,312.157,464.635,301.184z"
            />
          </g>
        </g>
      </svg>
    </Container>
  )
}

export default PwaRefresh
