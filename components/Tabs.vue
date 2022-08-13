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
            v-on:click="toggleTabs(1)"
            v-bind:class="{
              'text-blue-600 bg-white': openTab !== 1,
              'text-white bg-blue-600': openTab === 1,
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
            v-on:click="toggleTabs(2)"
            v-bind:class="{
              'text-blue-600 bg-white': openTab !== 2,
              'text-white bg-blue-600': openTab === 2,
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
            <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <p>messages</p>
            </div>
            <div
              class="mx-2"
              v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }"
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
                class="flex gap-4"
                v-for="(contact, index) in contacts"
                :key="index">
                <i class="bx bxs-user-circle bx-md" style="color: #1386d2"></i>
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
    handleContact(a) {
      console.log(a.title , a.date);
    },
  },
  computed: {

    contacts() {
      return this.$store.getters['contacts/getContacts']
    }

    // searchContact: function () {
    //   return this.contacts.filter((contact) => {
    //     return contact.title.toUpperCase().toLowerCase().match(this.search);
    //   });
    // },
  },
  created() {
      this.$store.dispatch('contacts/loadContacts')
  }
};
</script>