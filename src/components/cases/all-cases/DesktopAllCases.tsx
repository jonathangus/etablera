import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import CaseLink from '../CaseLink'
import SmoothSideScroll from '../../../utils/scroll/SmoothSideScroll'
import AllCaseTitle, { Title, Client } from './AllCaseTitle'
import { ICase } from '../../../types'
import useSmooth from '../../../hooks/useSmooth'
import useScheduleEffect, {
  SchedulePrio,
} from '../../../hooks/useScheduleEffect'
import { useUiContext } from '../../../contexts/UiContext'

const Wrapper = styled.div`
  white-space: nowrap;
`

const Outer = styled.div`
  overflow: hidden;
`

const Container = styled.div`
  overflow: hidden;
`

const StyledCaseLink = styled(CaseLink)`
  height: calc(880px * 0.5625);

  &:hover {
    transform: scale(1.2);
  }
`

const Item = styled.div<{ show: boolean; delay: number }>`
  width: 100%;
  width: 880px;
  display: inline-block;
  white-space: normal;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: scale(${p => (p.show ? 1 : 0.8)})
    translateY(${p => (p.show ? 0 : -20)}%) rotate(${p => (p.show ? 0 : -5)}deg);
  transition: opacity 0.4s ease,
    transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: ${p => p.delay}ms;
  overflow: hidden;

  ${Title}, ${Client} {
    transition: transform 0.65s ease, opacity 0.65s ease;
    transform: translateY(${p => (p.show ? 0 : 20)}%);
    opacity: ${p => (p.show ? 1 : 0)};
    transition-delay: ${p => 800 + p.delay * 3}ms;
  }

  ${Client} {
    transition-delay: ${p => 800 + p.delay * 3 + 200}ms;
  }
`

const ItemInner = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 10vh;
  overflow: hidden;
`

type Props = { nodes: ICase[] }

const DesktopAllCases = ({ nodes }: Props) => {
  const [show, setShow] = useState(false)
  const containerRef = useRef<HTMLElement>()
  const innerRef = useRef<HTMLElement>()
  const smooth = useSmooth(
    () =>
      new SmoothSideScroll(containerRef.current, {
        scrollable: innerRef.current,
      }),
    [],
    SchedulePrio.Immediate
  )
  const { animateContent } = useUiContext()

  useScheduleEffect(
    () => {
      setShow(animateContent)
    },
    [animateContent],
    SchedulePrio.Idle
  )

  const centerCase = (index: number) => {
    return smooth && smooth.center(index)
  }

  return (
    <Container show={animateContent} ref={containerRef}>
      <Outer>
        <Wrapper ref={innerRef} count={nodes.length}>
          {nodes.map((record, index) => (
            <Item
              show={show}
              delay={index * 65}
              data-case-item
              key={index || record.id}
            >
              <ItemInner>
                <StyledCaseLink
                  withScrollCenter={false}
                  preRouteChange={() => centerCase(index)}
                  record={record}
                ></StyledCaseLink>
                <AllCaseTitle record={record} />
              </ItemInner>
            </Item>
          ))}
        </Wrapper>
      </Outer>
    </Container>
  )
}

export default DesktopAllCases
