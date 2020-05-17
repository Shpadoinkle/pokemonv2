import {observer} from 'mobx-react'
import React from 'react'
import {Link} from 'react-router-dom'
import styled, {withTheme} from 'styled-components'
import leftArrow from '../assets/leftArrow.png'
import pokeball from '../assets/pokeball.png'
import partyStore from '../mobx/party'
import Padder from './Padder'

const _PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  @media only screen and (max-width: 800px) {
    position: relative;
    flex-direction: row;
    justify-content: center;
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
  @media only screen and (max-width: 800px) {
    height: 50px;
    width: 50px;
    margin: 0px 5px;
    background-size: contain;
  }
`

const GoToParty = styled(Link)`
  height: 76px;
  width: 76px;
  margin: 10px 0px;
  border-radius: 38px;
  background-color: #107b6a99;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  font-family: Moret;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    color: inherit;
    text-decoration: none !important;
  }
  @media only screen and (max-width: 800px) {
    position: fixed;
    background-color: #107b6a;
    bottom: 40px;
    right: 40px;
  }
`

const PartyPreview = observer(({...props}) => {
  let partList = new Array(6).fill({})

  partyStore.list.map((e, i) => {
    partList[i] = e
  })

  return (
    <_PreviewWrapper>
      {partList.map((e, i) => (
        <_PreviewImage key={i} image={e?.sprites?.front_default || pokeball} />
      ))}
      <GoToParty to="/party">
        <div>Party</div>
        <Padder h={2} />
        <img src={leftArrow} />
      </GoToParty>
    </_PreviewWrapper>
  )
})

export default withTheme(PartyPreview)
