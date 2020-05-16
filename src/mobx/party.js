import localForage from 'localforage'
import {action, observable} from 'mobx'
import {create, persist} from 'mobx-persist'

class PartyMon {
  @persist
  @observable
  id = ''

  @persist
  @observable
  name = ''
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
