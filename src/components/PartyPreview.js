import {observer} from 'mobx-react'
import React from 'react'
import styled, {withTheme} from 'styled-components'
import pokeball from '../assets/pokeball.png'
import partyStore from '../mobx/party'

const _PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 400px) {
    flex-direction: row;
  }
`

const _PreviewImage = styled.div`
  height: 84px;
  width: 84px;
  margin: 10px 0px;
  background-image: ${({image}) => `url(${image})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
`

const PartyPreview = observer(({...props}) => {
  let partList = new Array(6).fill({})

  partyStore.list.map((e, i) => {
    console.log(e)
    partList[i] = e
  })

  return (
    <_PreviewWrapper>
      {partList.map((e, i) => (
        <_PreviewImage key={i} image={e?.sprites?.front_default || pokeball} />
      ))}
    </_PreviewWrapper>
  )
})

export default withTheme(PartyPreview)
