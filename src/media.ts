// @flow

import { css } from 'styled-components'

export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
  smallPhone: 360,
}

type Sizes = {
  tablet: any
  phone: any
  desktop: any
  smallPhone: any
}

const media: Sizes = Object.keys(sizes).reduce(
  (acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css.call(undefined, ...args)};
      }
    `

    return acc
  },
  {
    tablet: '',
    phone: '',
    desktop: '',
    smallPhone: '',
  }
)

export default media
