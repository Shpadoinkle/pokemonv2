import axios from 'axios'
import {observer} from 'mobx-react'
import React, {Component} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import styled, {withTheme} from 'styled-components'
import DexMon from '../components/DexMon'
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
    // console.log('@@fetching', getTakeAmount, start)
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
    partyStore.addMon(mon)
  }

  render() {
    const {rawRes, pokedexList} = this.state
    return (
      <div
        style={{minHeight: '100vh', overflow: 'auto'}}
        ref={(ref) => (this.scrollParentRef = ref)}
      >
        <div>Dex</div>
        <div>TODO: -- number loaded at bottom</div>
        <div>{pokedexList.length}/151</div>
        <div
          onClick={() => {
            partyStore.clearParty()
          }}
        >
          Clear the Party List
        </div>
        <InfiniteScroll
          // loadMore={false}
          loadMore={this.getTheGuys}
          hasMore={pokedexList.length < 151}
          initialLoad
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          threshold={100}
          useWindow={true}
        >
          <Row>
            {/* <div>Left</div> */}

            <_DexContent>
              {pokedexList.map((e, i) => (
                <DexMon key={i} index={i} mon={e} onAdd={this.addAMon} />
              ))}
            </_DexContent>
            <PartyPreview />
          </Row>
        </InfiniteScroll>
      </div>
    )
  }
}

const _DexContent = styled.div`
  display: grid;
  grid-template-columns: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 20px;

  @media only screen and (max-width: 400px) {
    grid-template-columns: 150px 150px;
  }
`

export default withTheme(Dex)
