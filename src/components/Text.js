import React from 'react'
import styled, {withTheme} from 'styled-components'

const _Text = styled.div`
  font-family: Moret;
  font-style: normal;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
  font-size: ${({size}) => (size ? `${size}px` : '16px')};
  line-height: 100%;
`

const Text = ({children, ...props}) => <_Text {...props}>{children}</_Text>

export default withTheme(Text)
