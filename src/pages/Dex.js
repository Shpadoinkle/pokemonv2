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
import Text from '../components/Text'
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
      <PageWrapper>
        <SidePanel className="_title">
          <SidePanel_Inner>
            <Text size={36} bold>
              Choose your team
            </Text>
            <Col flex={0} className="mobileHide">
              <Text size={14}>Scroll for more</Text>
              <Padder />
              <img src={scrollIcon} />
            </Col>
            <Padder h={20} className="mobileShow" />
          </SidePanel_Inner>
        </SidePanel>
        <PartyPreview party={partyStore.list} className="mobileShow" />
        <CenterContent>
          <InfiniteScroll
            loadMore={this.getTheGuys}
            hasMore={pokedexList.length < 151}
            initialLoad
            threshold={100}
          >
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
          </InfiniteScroll>
        </CenterContent>
        <SidePanel className="mobileHide">
          <SidePanel_Inner>
            <PartyPreview party={partyStore.list} />
          </SidePanel_Inner>
        </SidePanel>
        <IndexWrapper>
          <Text size={24} bold>
            {pokedexList.length}/151
          </Text>
        </IndexWrapper>
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
    flex-direction: column;
    align-items: center;
    padding: 120px 40px;

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
    padding: 0px 0px 60px;
  }
`
const SidePanel = styled.div`
  flex: 1 1 0;
  position: relative;
`
const SidePanel_Inner = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  @media only screen and (max-width: 800px) {
    position: relative;
    top: unset;
    height: auto;
    display: block;
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

const IndexWrapper = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;

  max-width: 2000px;
  margin: 0 auto;
  text-align: center;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default withTheme(Dex)
