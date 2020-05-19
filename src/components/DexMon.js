import React from 'react'
import {Placeholder} from 'semantic-ui-react'
import styled, {withTheme} from 'styled-components'
import NickNameForm from './NickNameForm'
import Padder from './Padder'
import PokeIndex from './PokeIndex'
import Poke_Image from './Poke_Image'
import Row from './Row'
import TypeTag from './TypeTag'
import {X} from 'react-feather'

const _Remove = styled.div`
  height: 28px;
  width: 28px;
  background: #f8f8f8;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05),
    -10px -10px 4px rgba(255, 255, 255, 0.2);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  line-height: 28px;
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translate(-50%);
`

const _AddButton = styled.div`
  height: 75px;
  width: 75px;
  background: #f8f8f8;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.05),
    -10px -10px 4px rgba(255, 255, 255, 0.2);
  border-radius: 50%;

  display: flex;
  justify-content: center;

  font-size: 30px;
  line-height: 75px;
`

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

  &.isEmpty {
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 800px) {
    width: 150px;
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

const DexMon = ({
  mon = {},
  fetching = false,
  onAdd,
  onRemove,
  isInParty = false,
  isEmpty = false,
  canEdit = false,
  ...props
}) => {
  function onPress() {
    if (fetching) return
    if (onAdd) onAdd(mon)
  }
  function onRemovePress() {
    if (onRemove) onRemove(mon)
  }

  return (
    <_DexMonWrapper>
      <_DexMon
        onClick={onPress}
        className={isInParty ? ' inParty' : isEmpty ? 'isEmpty' : ''}
      >
        {!isEmpty ? (
          <>
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

            {canEdit ? (
              <NickNameForm mon={mon} />
            ) : (
              <_MonName>{mon.nickname || mon.name}</_MonName>
            )}
            <Padder h={14} />
            <PokeIndex>
              #{mon.id ? mon.id.toPokedex() : (props.index + 1).toPokedex()}
            </PokeIndex>
          </>
        ) : (
          <>
            <_AddButton>+</_AddButton>
          </>
        )}
        <Poke_Image mon={mon} />
        {!!onRemove && (
          <_Remove onClick={onRemovePress}>
            <X size={18} />
          </_Remove>
        )}
      </_DexMon>
    </_DexMonWrapper>
  )
}

export default withTheme(DexMon)
