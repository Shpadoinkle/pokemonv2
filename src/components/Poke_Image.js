import React from 'react'
import styled, {withTheme} from 'styled-components'
import pokeball from '../assets/pokeball.png'

const _HalfMoon = styled.div`
  border: 48px solid #c4c4c433;
  border-top-width: 0px;
  border-bottom-left-radius: 96px;
  border-bottom-right-radius: 96px;

  position: absolute;
  top: 24px;
  left: 50%;
  transform: translate(-50%, -50%);

  &.empty {
    display: none;
  }
`

const _PreviewImage = styled.img`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 140px;
  width: 140px;

  &.empty {
    height: 95px;
    width: 95px;
    top: -2px;
    background-color: #fff;
    border-radius: 50%;
  }
`

const Tag = ({mon = {}, ...props}) => (
  <>
    <_HalfMoon className={mon?.sprites?.front_default ? '' : 'empty'} />
    <_PreviewImage
      className={mon?.sprites?.front_default ? '' : 'empty'}
      src={mon?.sprites?.front_default || pokeball}
    />
  </>
)

export default withTheme(Tag)
