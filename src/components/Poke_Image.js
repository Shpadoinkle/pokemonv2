import React from 'react'
import styled, {withTheme} from 'styled-components'

const _HalfMoon = styled.div`
  border: 48px solid #c4c4c433;
  border-top-width: 0px;
  border-bottom-left-radius: 96px;
  border-bottom-right-radius: 96px;

  position: absolute;
  top: 24px;
  left: 50%;
  transform: translate(-50%, -50%);
`

const _PreviewImage = styled.img`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 140px;
  width: 140px;
`

const Tag = ({mon = {}, ...props}) => (
  <>
    <_HalfMoon />
    {mon?.sprites?.front_default && (
      <_PreviewImage src={mon?.sprites?.front_default} />
    )}
  </>
)

export default withTheme(Tag)
