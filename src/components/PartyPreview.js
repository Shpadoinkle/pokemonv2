import {observer} from 'mobx-react'
import React from 'react'
import partyStore from '../mobx/party'

const PartyPreview = observer(({...props}) => (
  <div>
    {partyStore.list.map((e) => (
      <div>{e.name}</div>
    ))}
  </div>
))

export default PartyPreview
