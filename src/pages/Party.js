import {observer} from 'mobx-react'
import React, {Component} from 'react'
import styled, {withTheme} from 'styled-components'
import Col from '../components/Col'
import DexMon from '../components/DexMon'
import GoToButton from '../components/GoToButton'
import Padder from '../components/Padder'
import Row from '../components/Row'
import Text from '../components/Text'
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

  render() {
    const {rawRes, pokedexList} = this.state
    let emptyList = new Array(6 - partyStore.list.length).fill({})

    return (
      <PageWrapper>
        <SidePanel>
          <SidePanel_Inner className="_title">
            <Text size={36} bold>
              Ash's Party
            </Text>
            <Text size={24} bold className="mobileShow">
              {partyStore.list.length}/6
            </Text>
          </SidePanel_Inner>
        </SidePanel>
        <CenterContent>
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
        </CenterContent>
        <SidePanel className="mobileHide">
          <SidePanel_Inner className="right">
            <Text size={24} bold>
              {partyStore.list.length}/6
            </Text>
            <Padder h={60} />
            <GoToButton to="/" title="Dex" />
          </SidePanel_Inner>
        </SidePanel>
        <GoToButton to="/" title="Dex" className="mobileShow" />
      </PageWrapper>
    )
  }
}

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 2000px;
  margin: 0 auto;
  @media only screen and (max-width: 800px) {
    padding: 120px 40px;
    flex-direction: column;
    align-items: center;
    .mobileHide {
      display: none;
    }
  }
  @media only screen and (min-width: 801px) {
    .mobileShow {
      display: none;
    }
  }
`
const CenterContent = styled.div`
  flex: 2 2 2;
  padding: 100px 0px 60px;
  @media only screen and (max-width: 800px) {
    padding: 20px 0px 60px;
  }
`
const SidePanel = styled.div`
  width: 100%;
  flex: 1 1 0;
  position: relative;
`
const SidePanel_Inner = styled.div`
  position: sticky;
  top: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 800px) {
    position: relative;
    top: unset;
    min-height: unset;
    width: 100%;

    &._title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`
const _DexContent = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 20px;
  margin: 0 auto;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 150px 150px;
    column-gap: 25px;
  }
`

export default withTheme(Dex)
