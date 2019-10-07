import React from 'react'
import styled from 'styled-components'
import { IService } from '../../types'
import Grid from '../Grid'
import { gutter, titleFont, semi } from '../../vars'
import YFactor from '../YFactor'
import media from '../../media'

const Container = styled(YFactor)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${gutter * 4}px;
  max-width: 700px;
  margin: 0 auto;

  ${media.tablet`
    grid-gap: ${gutter * 2}px;
`}
  ${media.phone`
        display:block;
  `}
`
const Part = styled.div`
  ${media.phone`
margin-bottom: ${gutter * 2}px;
  `}
`
const Text = styled.div`
  ul {
    padding: 0;
    list-style-type: none;
    color: ${p => p.theme.grayText};
  }
`

const Title = styled.h4`
  margin-bottom: ${gutter}px;
  font-weight: ${semi};
  font-size: 1.3rem;
`

type Props = {
  items: Array<IService>
}

const Services = ({ items }: Props) => {
  return (
    <Grid>
      <Container>
        {items.map((item, i) => (
          <Part key={i}>
            <Title>{item.name}</Title>
            <Text
              dangerouslySetInnerHTML={{
                __html: item.body.childMarkdownRemark.html,
              }}
            ></Text>
          </Part>
        ))}
      </Container>
    </Grid>
  )
}

export default Services
