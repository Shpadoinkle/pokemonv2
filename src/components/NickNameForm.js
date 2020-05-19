import React, {Component} from 'react'
import {Edit2} from 'react-feather'
import styled, {withTheme} from 'styled-components'
import partyStore from '../mobx/party'

const _MonNameWrapper = styled.div`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  width: 100%;

  margin: 0 auto;
  .hoverShow {
    position: absolute;
    display: none;
    right: -20px;
    top: 0;
  }
  &:hover {
    .hoverShow {
      display: block;
    }
    text-decoration: underline;
  }
`

const _MonName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;

  color: #333333;
  @media only screen and (max-width: 800px) {
    font-size: 28px;
  }
`

const Input = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  text-transform: capitalize;

  color: #333333;

  outline: none !important;
  width: 100%;
  border: none;
  padding: 0px;

  &:focus {
    border-color: ${({theme}) => theme.grey_1};
  }

  ::placeholder {
    color: ${({theme}) => theme.grey_2};
  }
  @media only screen and (max-width: 800px) {
    font-size: 28px;
  }
`

class NickNameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      value: '',
    }
  }

  startEdit = () => {
    const {mon} = this.props
    this.setState({
      editing: true,
      value: mon.nickname || mon.name,
    })
  }

  keyPress = (e) => {
    if (e.keyCode == 13) {
      const {mon} = this.props
      partyStore.updateNickName(mon, this.state.value)
      this.setState({editing: false})
    }
  }

  render() {
    const {editing, value} = this.state
    const {mon} = this.props

    if (editing) {
      return (
        <Input
          id="value"
          value={value}
          autoFocus
          onChange={(e) => {
            this.setState({value: e.target.value})
          }}
          onKeyDown={this.keyPress}
          placeholder={mon.name}
        />
      )
    }
    return (
      <_MonNameWrapper onClick={this.startEdit}>
        <div className="hoverShow">
          <Edit2 size={15} />
        </div>
        <_MonName>{mon.nickname || mon.name}</_MonName>
      </_MonNameWrapper>
    )
  }
}

export default withTheme(NickNameForm)
