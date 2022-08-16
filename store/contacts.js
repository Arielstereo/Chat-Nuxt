const apiContacts = process.env.apiContacts;

export const state = () => ({
  contacts: [],
  selectedContact: {},
});

export const mutations = {
  SET_CONTACTS(state, contacts) {
    state.contacts = contacts;
  },
  SET_SELECTED_CONTACT(state, selectedContact) {
    state.selectedContact = selectedContact;
  },
};

export const getters = {
  getContacts(state) {
    return state.contacts;
  },
  getSelectedContact(state) {
    return state.selectedContact;
  },
};

export const actions = {
  async loadContacts({ commit }) {
    let { data } = await this.$axios.get(apiContacts);
    commit("SET_CONTACTS", data.data);
  },
  async setSelectedContact({ commit }, selectedContact) {
    commit("SET_SELECTED_CONTACT", selectedContact);
  },
};
