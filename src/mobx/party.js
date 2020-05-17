import localForage from 'localforage'
import {action, observable} from 'mobx'
import {create, persist} from 'mobx-persist'

class MonSprites {
  @persist
  @observable
  front_default = ''
}
class MonType {
  @persist
  @observable
  name = ''
}
class MonTypesList {
  @persist('object', MonType)
  @observable
  type = {}
}
class PartyMon {
  @persist
  @observable
  id = ''

  @persist
  @observable
  name = ''

  @persist('object', MonSprites)
  @observable
  sprites = {}

  @persist('list', MonTypesList)
  @observable
  types = []
}

class PartyStore {
  @observable hydrated = false

  @persist('list', PartyMon)
  @observable
  list = []

  @action
  addMon(mon) {
    if (!this.hydrated) return
    if (this.list.length >= 6) return //cap out at 6
    if (this.list.findIndex((e) => e.name === mon.name) > -1) return //don't add duplicates
    this.list.push(mon)
  }

  @action
  clearParty() {
    this.list = []
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
})

// create the state
const partyStore = new PartyStore()

hydrate('party', partyStore).then(() => {
  partyStore.hydrated = true
})

export default partyStore
