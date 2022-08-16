const apiConversations = process.env.apiConversations;

export const state = () => ({
  messages: [],
  selectedSender: {
    id: "",
    title: "",
    lastSeenDate: "",
    receivers: [],
  },
  selectedReceiver: {
    id: "",
    title: "",
    lastSeenDate: "",
  },
});

export const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  SET_INITIAL_SENDER(state, initialSender) {
    state.selectedSender.id = initialSender.id;
    state.selectedSender.title = initialSender.title;
    state.selectedSender.lastSeenDate = initialSender.date;
    state.selectedSender.receivers = initialSender.receivers;
  },
  SET_SELECTED_SENDER(state, selectedSender) {
    state.selectedSender.id = selectedSender.id;
    state.selectedSender.title = selectedSender.title;
    state.selectedSender.lastSeenDate = selectedSender.date;
  },
  SET_SELECTED_RECEIVER(state, selectedReceiver) {
    state.selectedReceiver.id = selectedReceiver.id;
    state.selectedReceiver.title = selectedReceiver.title;
    state.selectedReceiver.lastSeenDate = selectedReceiver.lastSeenDate;
  },
  SET_RECEIVERS(state, selectedSender) {
    state.selectedSender.receivers = [];
    for (let i = 0; i < state.messages.length; i++) {
      let chat = state.messages[i];
      let newReceiver = {};
      if (chat.users[0] === selectedSender.id) {
        newReceiver.id = chat.users[1];
      } else if (chat.users[1] === selectedSender.id) {
        newReceiver.id = chat.users[0];
      }
      newReceiver.lastMessageTime = chat.lastMessageTime;
      state.selectedSender.receivers.push(newReceiver);
    }
  },
};

export const getters = {
  getMessages(state) {
    return state.messages;
  },
  getSelectedReceiver(state) {
    return state.selectedReceiver;
  },
  getSelectedSender(state) {
    return state.selectedSender;
  },
};

export const actions = {
  async loadMessages({ commit }) {
    let response = await this.$axios.get(apiConversations);
    let messages = response.data.data;
    commit("SET_MESSAGES", messages);
  },
  async setSelectedSender({ commit }, selectedSender) {
    commit("SET_SELECTED_SENDER", selectedSender);
    commit("SET_RECEIVERS", selectedSender);
  },
  async setSelectedReceiver({ commit }, selectedReceiver) {
    commit("SET_SELECTED_RECEIVER", selectedReceiver);
  },
  async setInitialSender({ commit }) {
    let initialSender = {
      id: "1",
      title: "Sarah Kortney",
      lastSeenDate: "Last seen today 12:24",
      receivers: [
        { id: 2, lastMessageTime: "18:20" },
        { id: 5, lastMessageTime: "10:20" },
      ],
    };
    commit("SET_INITIAL_SENDER", initialSender);
  },
};
