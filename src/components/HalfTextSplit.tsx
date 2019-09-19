import React from 'react'
import styled from 'styled-components'

const perspective = '60rem'
const splitPosition = 49
const splitThickness = 1

const Wrapper = styled.div`
  transform-style: preserve-3d;
  transform: perspective(${perspective});
  cursor: pointer;
`

const Mask = styled.span`
  display: block;
  position: absolute;
  overflow: hidden;
  color: var(--half-text-split-color);
  top: 0;
  height: ${splitPosition}%;
  transition: all 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);

  span {
    display: block;
  }
`

const SecondMask = styled(Mask)`
  top: ${splitPosition - 0.1}%;
  height: ${100 - splitPosition + 0.1}%;

  span {
    transform: translateY(-${splitPosition}%);
  }
`

const Item = styled.span`
  position: relative;
  color: transparent;
  cursor: pointer;
  display: block;
  line-height: 1.3;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: ${splitPosition}%;
    left: -10%;
    right: -10%;
    height: ${splitThickness}px;
    border-radius: ${splitThickness}px;
    margin-top: -${splitThickness / 2}px;
    background: var(--half-text-split-color);
    transform: scale(0);
    transition: transform 0.8s cubic-bezier(0.16, 1.08, 0.38, 0.98);
    z-index: 1;
  }

  &:hover,
  &:active {
    cursor: pointer;
    &:before {
      transform: scale(1);
    }

    ${Mask} {
      transform: skewX(4deg) translateX(2px);
    }
    ${SecondMask} {
      transform: skewX(4deg) translateX(-2px);
    }
  }
`

const HalfTextSplit = ({ text }) => {
  return (
    <Wrapper>
      <Item>
        {text}
        <Mask>
          <span>{text}</span>
        </Mask>
        <SecondMask>
          <span>{text}</span>
        </SecondMask>
      </Item>
    </Wrapper>
  )
}

export default HalfTextSplit
