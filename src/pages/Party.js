import {observer} from 'mobx-react'
import React, {Component} from 'react'
import styled, {withTheme} from 'styled-components'
import Col from '../components/Col'
import DexMon from '../components/DexMon'
import Row from '../components/Row'
import partyStore from '../mobx/party'

@observer
class Dex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokedexList: [],
      loading: false,
    }
  }

  removeMon = (mon) => {
    partyStore.removeMon(mon)
  }

  render() {
    const {rawRes, pokedexList} = this.state
    let emptyList = new Array(6 - partyStore.list.length).fill({})
    return (
      <Style
        style={{
          minHeight: '100vh',
          overflow: 'auto',
          padding: '60px 30px',
          height: 'fill-available',
        }}
      >
        <Row className="mobileHeader" jc="space-between" ai="center">
          <ChooseText>Ash's Party</ChooseText>
          <ChooseText style={{fontSize: 24}} className="mobileHeader">
            {partyStore.list.length}/6
          </ChooseText>
        </Row>
        <HomeRow>
          <Col className="hidemobile" flex={1} jc="center" ai="center">
            <ChooseText>Ash's Party</ChooseText>
          </Col>
          <_DexContent>
            {partyStore.list.map((e, i) => (
              <DexMon
                fetching={e.fetching}
                isInParty={
                  partyStore.list.findIndex((x) => x.name === e.name) > -1
                }
                key={e.id || `index_${e.name}`}
                index={i}
                mon={e}
                canEdit
                onRemove={this.removeMon}
              />
            ))}

            {emptyList.map((e, i) => (
              <DexMon
                key={`empty_${i}`}
                isEmpty
                onAdd={() => {
                  this.props.history.push('/')
                }}
              />
            ))}
          </_DexContent>
          <Col
            className="hidemobile"
            flex={1}
            jc="center"
            ai="center"
            style={{position: 'relative', minHeight: 100, minWidth: 100}}
          >
            <ChooseText style={{fontSize: 24}}>
              {partyStore.list.length}/6
            </ChooseText>
          </Col>
        </HomeRow>
      </Style>
    )
  }
}

const Style = styled.div`
  .mobileHeader {
    display: none;
  }
  @media only screen and (max-width: 800px) {
    .hidemobile {
      display: none;
    }
    .mobileHeader {
      display: flex;
    }
  }
`

const _DexContent = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 20px;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 150px 150px;
    column-gap: 25px;
  }
`

const _leftCol = styled(Col)`
  align-items: center;
  justify-content: flex-start;
  padding: 20px;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`

const HomeRow = styled(Row)`
  height: fit-content;
  justify-content: space-evenly;
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const ChooseText = styled.div`
  font-family: Moret;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;
`

const IndexWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default withTheme(Dex)
