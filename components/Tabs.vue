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
              cursor-pointer
            "
            @click="toggleTabs(2)"
            :class="{
              'text-blue-600 bg-white': openTab !== 2,
              'text-white bg-blue-600': openTab === 2,
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
              cursor-pointer
            "
            @click="toggleTabs(1)"
            :class="{
              'text-blue-600 bg-white': openTab !== 1,
              'text-white bg-blue-600': openTab === 1,
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
          <div class="flex flex-col gap-4">
            <div
              v-for="(receiver, index) in getReceivers"
              :key="index"
              @click="handleReceiver(receiver)"
              class="flex gap-4 cursor-pointer"
              :class="{ hidden: openTab !== 2, block: openTab === 2 }"
            >
              <div>
                <i class="bx bxs-user-circle bx-lg" style="color: #1386d2"></i>
              </div>
              <div class="flex flex-col">
                <a>{{ receiver.title }}</a>
                <span> {{ receiver.lastMessageTime }}</span>
              </div>
            </div>
            <div
              class="mx-2"
              :class="{ hidden: openTab !== 1, block: openTab === 1 }"
            >
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

              <div
                class="flex gap-6 py-1"
                v-for="(contact, index) in searchContact"
                :key="index"
              >
                <img class="h-10 w-10 rounded-full" :src="contact.img" />
                <a class="cursor-pointer" @click="handleContact(contact)">{{
                  contact.title
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openTab: 1,
      search: "",
    };
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber;
    },
    handleMessage(contact) {
      this.$store.dispatch("messages/addReceiver", contact);
    },
    handleReceiver(contact) {
      this.$store.dispatch("messages/setSelectedReceiver", contact);
      this.$router.push({ name: "conversations" });
    },
    handleContact(contact) {
      this.$store.dispatch("contacts/setSelectedContact", contact);
      this.$router.push({ name: "index" });
    },
  },
  computed: {
    messages() {
      return this.$store.getters["messages/getMessages"];
    },
    contacts() {
      return this.$store.getters["contacts/getContacts"];
    },
    getReceivers() {
      let selectedSender = this.$store.getters["messages/getSelectedSender"];

      let result = [];
      for (let i = 0; i < selectedSender.receivers.length; i++) {
        console.log("receiverId is ", selectedSender.receivers[i].id);
        for (let j = 0; j < this.contacts.length; j++) {
          console.log("this.contacts[j].id is ", this.contacts[j].id);
          if (this.contacts[j].id === selectedSender.receivers[i].id) {
            result.push({
              id: this.contacts[j].id,
              lastSeenDate: this.contacts[j].date,
              title: this.contacts[j].title,
              lastMessageTime: selectedSender.receivers[i].lastMessageTime,
            });
          }
        }
      }

      return result;
    },
    searchContact() {
      return this.contacts.filter((contact) => {
        return contact.title.toLowerCase().includes(this.search);
      });
    },
  },
  created() {
    this.$store.dispatch("contacts/loadContacts");
    this.$store.dispatch("messages/loadMessages");
    this.$store.dispatch("messages/setInitialSender");
  },
};
</script>
