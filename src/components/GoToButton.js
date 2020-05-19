import React from 'react'
import {Link} from 'react-router-dom'
import styled, {withTheme} from 'styled-components'
import leftArrow from '../assets/leftArrow.png'
import Padder from './Padder'

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

const GoToButton = ({title = '', to = '', className = '', ...props}) => (
  <GoToParty to={to} className={className}>
    <div>{title}</div>
    <Padder h={2} />
    <img src={leftArrow} />
  </GoToParty>
)

export default withTheme(GoToButton)
