import React, { useEffect, useRef, memo } from 'react'
import styled from 'styled-components'
import { ISectionSectionOutro } from '../../types'
import { titleFont, textFont } from '../../vars'
import media from '../../media'
import useChillEffect from '../../hooks/useChillEffect'
import DefferedCallbacks from '../../utils/deferred-callbacks'

const Container = styled.div``

const LinkWrapper = styled.div`
  text-align: center;
`
const Link = styled.a`
  color: ${p => p.theme.color};
  text-decoration: none;
  font-family: ${titleFont};
  font-size: 2.5rem;
  letter-spacing: 1.5px;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;

  ${media.tablet`
    font-size: 2rem;
  `}

  ${media.phone`
    font-size: 1rem;
  `}

  &:before {
    content: '>';
    font: inherit;
    font-family: ${textFont};
    vertical-align: 0.1em;
    display: inline-block;
    transform: scaleY(0) translateX(-1em);
    margin-right: -0.25em;
  }

  &:before,
  .char {
    transition: transform 0.8s cubic-bezier(0.75, 0, 0.24, 0.98);
    transition-delay: calc(0.015s * var(--char-index));
  }

  .char {
    transform: translateX(-0.15em);
  }

  &:hover:before {
    transform: scaleY(1) translateX(0em);
  }

  &:hover .char {
    transform: translateX(1em);
    transform: translateX(0.5em) translateX(calc(0.1em * var(--char-index)));
  }
`

const ContentfulSectionOutro = ({
  title,
  buttonText,
  websiteLink,
  text,
}: ISectionSectionOutro) => {
  const linkEl = useRef()
  const splitLink = async () => {
    const Splitting = await DefferedCallbacks.Splitting()

    Splitting({
      target: linkEl.current,
    })
  }

  useChillEffect(() => {
    if (buttonText) {
      splitLink()
    }
  }, [buttonText])

  return (
    <Container>
      {buttonText && websiteLink && (
        <LinkWrapper>
          <Link
            ref={linkEl}
            href={websiteLink}
            target="_blank"
            title={buttonText}
          >
            {buttonText}
          </Link>
        </LinkWrapper>
      )}
    </Container>
  )
}

export default memo(ContentfulSectionOutro)
