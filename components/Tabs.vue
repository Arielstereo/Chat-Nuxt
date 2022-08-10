<template>
  <div class="flex flex-wrap">
    <div class="w-1/4 absolute right-8">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              shadow-lg
              rounded
              block
              leading-normal
            "
            v-on:click="toggleTabs(1)"
            v-bind:class="{
              'text-pink-600 bg-white': openTab !== 1,
              'text-white bg-pink-600': openTab === 1,
            }"
          >
            Messages
          </a>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <a
            class="
              text-xs
              font-bold
              uppercase
              px-5
              py-3
              shadow-lg
              rounded
              block
              leading-normal
            "
            v-on:click="toggleTabs(2)"
            v-bind:class="{
              'text-pink-600 bg-white': openTab !== 2,
              'text-white bg-pink-600': openTab === 2,
            }"
          >
            Contacts
          </a>
        </li>
      </ul>
      <div
        class="
          relative
          flex flex-col
          min-w-0
          break-words
          bg-white
          w-full
          mb-6
          shadow-lg
          rounded
        "
      >
        <div class="px-4 py-5 flex-auto">
          <div class="tab-content tab-space">
            <div>
              <form class="flex items-center">
                <input
                  type="text"
                  class="
                    h-5
                    w-full
                    mx-2
                    my-4
                    p-6
                    rounded-3xl
                    border-2
                    focus:bg-gray-100
                  "
                  placeholder="Search.."
                  v-model="search"
                />
              </form>
            </div>
            <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <p>messages</p>
            </div>
            <div
              class="mx-2"
              v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }"
              v-for="contact in searchContact"
              :key="contact.id"
            >
              <p class="px-6 py-2">{{ contact.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const apiContacts = process.env.apiContacts;
const apiConversations = process.env.apiConversations;

export default {
  data() {
    return {
      openTab: 1,
      contacts: [],
      messages: [],
      search: "",
    };
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber;
    },
  },
  computed: {
    searchContact: function() {
      return this.contacts.filter((contact) => {
        return contact.title.toUpperCase().toLowerCase().match(this.search);
      });
    },
  },
  async mounted() {
    await axios.get(apiContacts).then((response) => {
      this.contacts = response.data.data;
    });
    await axios.get(apiConversations).then((response) => {
      console.log(response.data);
      this.messages = response.data;
    });
  },
};
</script>