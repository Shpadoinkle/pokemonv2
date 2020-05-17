import React from 'react'
import {Placeholder} from 'semantic-ui-react'
import styled, {withTheme} from 'styled-components'
import Padder from './Padder'
import PokeIndex from './PokeIndex'
import Poke_Image from './Poke_Image'
import Row from './Row'
import TypeTag from './TypeTag'

const _DexMonWrapper = styled.div`
  grid-column-start: auto;
  grid-column-end: auto;
  grid-row-start: auto;
  grid-row-end: auto;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const _DexMon = styled.div`
  cursor: pointer;
  position: relative;
  height: 200px;
  width: 200px;
  background: #f9f9f9;
  border: 2px solid #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05),
    -10px -10px 4px rgba(255, 255, 255, 0.2);

  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

  &.inParty {
    background: #f2fff4;
    border-color: #97cbbe;
  }
  @media only screen and (max-width: 800px) {
    width: 150px;
  }
`

const _MonName = styled.div`
  font-family: Moret;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  text-transform: capitalize;

  color: #333333;
`

const DexMon = ({
  mon = {},
  fetching = false,
  onAdd,
  isInParty = false,
  ...props
}) => {
  function onPress() {
    if (fetching) return
    if (onAdd) onAdd(mon)
  }

  return (
    <_DexMonWrapper>
      <_DexMon onClick={onPress} className={isInParty ? ' inParty' : ''}>
        <Padder h={25} />
        <Row reverse jc="center">
          {fetching ? (
            <Placeholder style={{minHeight: 22}}>
              <Placeholder.Paragraph>
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Placeholder>
          ) : (
            mon?.types?.map((e, i) => (
              <TypeTag key={i} className={`type_${e.type.name}`}>
                {e.type.name}
              </TypeTag>
            ))
          )}
        </Row>
        <Padder h={14} />
        <_MonName>{mon.name}</_MonName>
        <Padder h={14} />
        <PokeIndex>
          #{mon.id ? mon.id.toPokedex() : (props.index + 1).toPokedex()}
        </PokeIndex>
        <Poke_Image mon={mon} />
      </_DexMon>
    </_DexMonWrapper>
  )
}

export default withTheme(DexMon)
