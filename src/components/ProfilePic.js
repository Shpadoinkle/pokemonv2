import React from 'react'
import styled from 'styled-components'
import Piccy from '../assets/Ash.png'

const _ProfilePic = styled.img`
  height: ${({h}) => (h ? `${h}px` : '56px')};
  width: ${({h}) => (h ? `${h}px` : '56px')};
  background-color: #fff;
  border-radius: ${({h}) => (h ? `${h / 2}px` : ' 28px')};
`
const ProfilePic = ({...props}) => <_ProfilePic src={Piccy} {...props} />

export default ProfilePic
