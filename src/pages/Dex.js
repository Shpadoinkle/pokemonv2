import axios from 'axios'
import {observer} from 'mobx-react'
import React, {Component} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled, {withTheme} from 'styled-components'
import scrollIcon from '../assets/scroll.svg'
import Col from '../components/Col'
import DexMon from '../components/DexMon'
import Padder from '../components/Padder'
import PartyPreview from '../components/PartyPreview'
import Row from '../components/Row'
import partyStore from '../mobx/party'

@observer
class Dex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      take: 12,
      start: 0,

      pokedexList: [],
      rawRes: '',

      loading: false,
    }
  }

  getTake() {
    const {pokedexList} = this.state
    return Math.min(151 - pokedexList.length, 12)
  }

  getTheGuys = async () => {
    const {loading, take, start, pokedexList} = this.state
    if (loading || pokedexList.length >= 151) return
    this.setState({loading: true})
    const getTakeAmount = this.getTake()
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${getTakeAmount}&offset=${start}`
    axios({
      method: 'get',
      url: apiUrl,
    })
      .then((res) => {
        const {pokedexList} = this.state
        const newlist =
          res?.data?.results.map((e) => {
            return {...e, fetching: true}
          }) || []
        this.setState(
          {
            start: start + take,
            pokedexList: [...pokedexList, ...newlist],
            rawRes: JSON.stringify(res),
          },
          () => this.setState({loading: false})
        )
        return newlist
      })
      .then((theMons) => {
        // console.log('@@fetched mons', theMons)
        this.fetchMonData([...theMons])
      })
      .catch((err) => {
        console.log(err)
        console.log('@@error')
        this.setState({loading: false})
      })
  }

  fetchMonData = async (theMons) => {
    theMons.forEach(async (pokemon) => {
      axios({
        method: 'get',
        url: pokemon.url,
      })
        .then((res) => {
          const monResponse = res?.data || null
          // console.log('@@@@@@', monResponse || 'null')
          if (monResponse) {
            this.setState({
              pokedexList: this.state.pokedexList.map((e) => {
                if (e.name === monResponse.name) {
                  return monResponse
                }
                return e
              }),
            })
          }
        })
        .catch((err) => {
          console.log(err)
          console.log('@@error - Single Pokemon')
        })
    })
  }

  addAMon = (mon) => {
    partyStore.addMon(mon, true)
  }

  render() {
    const {rawRes, pokedexList} = this.state
    return (
      <div
        style={{minHeight: '100vh', overflow: 'auto', padding: '60px 30px'}}
        ref={(ref) => (this.scrollParentRef = ref)}
      >
        <ChooseText className="mobileHeader">Choose your team</ChooseText>
        <InfiniteScroll
          // loadMore={false}
          loadMore={this.getTheGuys}
          hasMore={pokedexList.length < 151}
          initialLoad
          // loader={
          //   <div className="loader" key={0}>
          //     Loading ...
          //   </div>
          // }
          threshold={100}
          // useWindow={true}
        >
          <HomeRow>
            {/* <div>Left</div> */}
            <_leftCol flex={1}>
              <Padder h={200} />
              <ChooseText>Choose your team</ChooseText>
              <Padder h={200} />
              <Row style={{flexDirection: 'column'}}>
                <ChooseText style={{fontSize: 12}}>Scroll for more</ChooseText>
                <img src={scrollIcon} />
              </Row>
            </_leftCol>
            <_DexContent>
              {pokedexList.map((e, i) => {
                return (
                  <DexMon
                    fetching={e.fetching}
                    isInParty={
                      partyStore.list.findIndex((x) => x.name === e.name) > -1
                    }
                    key={e.id || `index_${e.name}`}
                    index={i}
                    mon={e}
                    onAdd={this.addAMon}
                  />
                )
              })}
            </_DexContent>
            <Col
              flex={1}
              ai="center"
              style={{position: 'relative', minHeight: 100, minWidth: 100}}
            >
              <PartyPreview party={partyStore.list} />
            </Col>
          </HomeRow>
        </InfiniteScroll>
        <IndexWrapper>
          <ChooseText style={{fontSize: 24}}>
            {pokedexList.length}/151
          </ChooseText>
        </IndexWrapper>
      </div>
    )
  }
}

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
  justify-content: space-evenly;
  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const ChooseText = styled.p`
  font-family: Moret;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;

  &.mobileHeader {
    display: none;
    @media only screen and (max-width: 800px) {
      display: block;
    }
  }
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
