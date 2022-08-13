const apiContacts = process.env.apiContacts;

export const state = () => ({
  contacts: [],
})

export const actions = {
  async loadContacts({commit}) {
    let response = await this.$axios.get(apiContacts);

    commit('setContacts', response.data.data);
  }
}

export const getters = {
  getContacts(state) {
   return state.contacts
  }
}

export const mutations = {
  setContacts(state,contacts) {
    state.contacts = contacts
  }
}
