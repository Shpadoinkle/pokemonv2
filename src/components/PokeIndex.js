import React from 'react'
import styled, {withTheme} from 'styled-components'

const _Tag = styled.div`
  background-color: #e5e5e5;
  padding: 5px 14px;
  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #000000;

  align-self: center;
  border-radius: 32px;
`

const Tag = ({children, ...props}) => <_Tag {...props}>{children}</_Tag>

export default withTheme(Tag)
