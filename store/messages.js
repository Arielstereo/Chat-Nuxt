const apiConversations = process.env.apiConversations;

export const state = () => ({
  messages: [],
});

export const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  },
};

export const getters = {
  getMessages(state) {
    return state.messages;
  },
};

export const actions = {
  async loadMessages({ commit }) {
    let response = await this.$axios.get(apiConversations);

    commit("setMessages", response.data.data);
  },
};
