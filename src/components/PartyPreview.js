import React from 'react'
import {Link} from 'react-router-dom'
import styled, {withTheme} from 'styled-components'
import pokeball from '../assets/pokeball.png'
import GoToButton from './GoToButton'

const _PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* position: fixed; */
  @media only screen and (max-width: 800px) {
    /* position: relative; */
    flex-direction: row;
    justify-content: center;
    /* position: relative; */
    flex-direction: row;
    justify-content: center;
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 85px;
    z-index: 50;
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
    background-color: #e5e5e5;
    border-radius: 50%;
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
  font-family: Roboto;
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
    bottom: 20px;
    right: 20px;
    z-index: 10;
  }
`

const PartyPreview = ({party = [], className = '', ...props}) => {
  let emptyList = new Array(6 - party.length).fill({})
  return (
    <_PreviewWrapper className={className}>
      {party.map((e, i) => (
        <_PreviewImage
          className="jello-horizontal"
          key={i}
          image={e?.sprites?.front_default || pokeball}
        />
      ))}
      {emptyList.map((e, i) => (
        <_PreviewImage key={`empty_${i}`} image={pokeball} />
      ))}

      <GoToButton to="/party" title="Party" />
    </_PreviewWrapper>
  )
}

export default withTheme(PartyPreview)
