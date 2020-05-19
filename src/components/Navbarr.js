import React, {Component} from 'react'
import {Menu} from 'react-feather'
import styled, {withTheme} from 'styled-components'
import Col from './Col'
import Modal from './Modal'
import Padder from './Padder'
import ProfilePic from './ProfilePic'
import Row from './Row'
import {TextLink} from './Text'

class Navbarr extends Component {
  constructor(props) {
    super(props)
    this.state = {modalOpen: false}
  }
  render() {
    const {modalOpen} = this.state
    return (
      <>
        <NavBarWrapper>
          <div />
          <Row jc="flex-end" ai="center" className="mobileHide">
            <TextLink to="/">POKEDEX</TextLink>
            <Padder h={60} w />
            <TextLink to="/party">Party</TextLink>
            <Padder h={60} w />
            <ProfilePic h={56} />
          </Row>
          {!modalOpen && (
            <Menu
              color="#fff"
              size={30}
              className="_mobileShow"
              onClick={() => {
                this.setState({modalOpen: true})
              }}
            />
          )}
        </NavBarWrapper>
        <Modal
          show={modalOpen}
          onClose={() => {
            this.setState({modalOpen: false})
          }}
        >
          <ProfilePic h={100} />

          <Col ai="center" flex={0}>
            <TextLink
              to="/"
              size={24}
              style={{fontFamily: 'Work Sans'}}
              onClick={() => {
                this.setState({modalOpen: false})
              }}
            >
              POKEDEX
            </TextLink>
            <Padder h={60} />
            <TextLink
              to="/party"
              size={24}
              style={{fontFamily: 'Work Sans'}}
              onClick={() => {
                this.setState({modalOpen: false})
              }}
            >
              Party
            </TextLink>
          </Col>
          <div />
        </Modal>
      </>
    )
  }
}

export default withTheme(Navbarr)

const NavBarWrapper = styled.div`
  z-index: 10;
  position: fixed;
  background-color: #333;
  height: 80px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0px 60px;

  ._mobileShow {
    display: block;
  }

  @media only screen and (max-width: 800px) {
    padding: 0px 40px;
    .mobileHide {
      display: none;
    }
  }

  @media only screen and (min-width: 801px) {
    ._mobileShow {
      display: none;
    }
  }
`
