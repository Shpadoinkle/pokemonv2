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

  @persist
  @observable
  nickname = ''

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
  addMon(mon, toggle = false) {
    if (!this.hydrated) return
    const doesExist = this.list.findIndex((e) => e.id === mon.id) > -1
    if (doesExist && !toggle) return //don't add duplicates
    if (doesExist && toggle) {
      this.list = this.list.filter((e) => {
        return e.id !== mon.id
      })
    } else if (this.list.length < 6) {
      const {id, name, sprites, types} = mon
      this.list.push({id, name, sprites, types, nickname: ''})
    }
  }

  @action
  removeMon(mon) {
    if (!this.hydrated) return
    this.list = this.list.filter((e) => e.id !== mon.id)
  }

  @action
  updateNickName(mon, name) {
    if (!this.hydrated) return
    this.list = this.list.map((e) => {
      if (e.id === mon.id) {
        e.nickname = name
      }
      return e
    })
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
