import React from 'react'
import {Placeholder} from 'semantic-ui-react'
import styled, {withTheme} from 'styled-components'
import Row from './Row'

const _DexMonWrapper = styled.div`
  grid-column-start: auto;
  grid-column-end: auto;
  grid-row-start: auto;
  grid-row-end: auto;
  height: 160px;
  width: 120px;
  border: 1px solid #ccc;
`

const _DexMon = styled.div`
  padding: 20px;
  height: 100%;
`

const DexMon = ({mon = {fetching: true}, ...props}) => (
  <_DexMonWrapper>
    <_DexMon>
      <div>
        <Row jc="center">
          {mon.fetching && (
            <Placeholder style={{height: 60, width: 60}}>
              <Placeholder.Image square />
            </Placeholder>
          )}
        </Row>
        <div>
          #{mon.id ? mon.id.toPokedex() : (props.index + 1).toPokedex()}
        </div>
        <div>{mon.name}</div>
        {mon.fetching ? (
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
          <div>
            {mon.types.map((e) => (
              <div>{e.type.name}</div>
            ))}
          </div>
        )}
      </div>
    </_DexMon>
  </_DexMonWrapper>
)

export default withTheme(DexMon)
