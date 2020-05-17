import React from 'react'
import styled, {withTheme} from 'styled-components'

const _Tag = styled.div`
  padding: 4px 18px;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-transform: capitalize;
  color: #fff;
  margin-left: 8px;

  :nth-child(0) {
    margin-left: 0px;
  }
`

const Tag = ({children, ...props}) => <_Tag {...props}>{children}</_Tag>

export default withTheme(Tag)
