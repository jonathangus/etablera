import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Elem = styled.div`
  line-height: 1;

  svg {
    transform: translate(-3px);
  }
  path {
    fill: ${p => p.color || p.theme.color};
    stroke: ${p => p.backgroundColor || p.theme.backgroundColor};
  }
`

const Heart = ({ backgroundColor, color, ...rest }, ref) => {
  return (
    <Elem color={color} backgroundColor={backgroundColor}>
      <svg
        {...rest}
        ref={ref}
        width="33"
        height="29"
        viewBox="0 0 33 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6211 5.88616L14.6167 3.82153C11.3698 0.477073 5.86629 0.975817 3.27349 4.84949C1.11052 8.08101 1.53325 12.3908 4.28291 15.1404L8.03601 18.8935L15.0959 25.9534C15.9522 26.8097 17.3405 26.8097 18.1968 25.9534L28.8399 15.3103C31.6778 12.4725 32.0434 7.99709 29.7038 4.73622C26.9663 0.920732 21.4063 0.604221 18.2534 4.08439L16.6211 5.88616Z"
          fill="white"
          stroke="black"
          stroke-width="2"
        />
      </svg>
    </Elem>
  )
}

export default forwardRef(Heart)
