import { observable, computed, action } from "mobx";
import { create, persist } from "mobx-persist";
import localForage from "localforage";

class PartyMon {
  @persist
  @observable
  id = "";
}

class UserStore {
  @observable hydrated = false;

  @persist("list", PartyMon)
  @observable
  list = [];

  @action
  updateMon(mon) {
    console.log("@@mon", mon);
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
});

// create the state
const userStore = new UserStore();

hydrate("user", userStore).then(() => {
  userStore.hydrated = true;
});

export default userStore;
