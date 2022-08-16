<template>
  <div class="flex flex-col">
    <div class="flex w-full">
      <div class="container mx-auto">
        <div
          class="
            flex
            gap-4
            items-center
            text-start
            bg-slate-200
            px-8
            py-4
            w-2/3
            rounded-xl
            m-4
            shadow-md">
          <i class="bx bxs-user-circle bx-lg" style="color: #1386d2"></i>
          <div class="flex flex-col">
            <h1>{{ selectedReceiver.title }}</h1>
            <span>{{ selectedReceiver.lastSeenDate }}</span>
          </div>
        </div>
        <div
          class="
            flex flex-col
            px-32
            md:grid
            grid-cols-8
            mx-auto
            my-4
            p-2
            text-blue-50
          "
          v-for="(chat, index) in chats"
          :key="index"
        >
          <div class="flex md:contents">
            <div
              :class="{
                'bg-blue-500 mx-32': chat.sender === 1,
                'bg-gray-500': chat.sender === 2 || 5,
              }"
              class="col-start-1 col-end-7 p-4 rounded-xl mr-32 shadow-md"
            >
              <div class="flex gap-2 justify-between">
                <div class="flex gap-4 items-center pb-4">
                  <i class="bx bxs-user-circle bx-lg" style="color: #ffff"></i>
                  <h3 v-if="chat.sender === 1" class="font-semibold text-lg">
                    {{ selectedSender.title }}
                  </h3>
                  <h3 v-if="chat.sender === 2" class="font-semibold text-lg">
                    {{ selectedReceiver.title }}
                  </h3>
                  <h3 v-if="chat.sender === 5" class="font-semibold text-lg">
                    {{ selectedReceiver.title }}
                  </h3>
                </div>
                <p class="leading-tight text-white">
                  {{ chat.time }}
                </p>
              </div>
              <span class="px-2"> {{ chat.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <Tabs class="mt-2" />
    </div>

    <div class="w-5/6 mt-2">
      <div class="mt-16 px-8">
        <form class="flex items-center">
          <input
            class="w-3/4 h-14 m-8 p-6 rounded-3xl border-2 focus:bg-gray-100"
            placeholder="Say something.."
          />

          <button class="rounded-full bg-blue-400 p-2">
            <i class="bx bx-chevron-right bx-md" style="color: #ffffff"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    messages() {
      return this.$store.getters["messages/getMessages"];
    },
    selectedReceiver() {
      return this.$store.getters["messages/getSelectedReceiver"];
    },
    selectedSender() {
      return this.$store.getters["messages/getSelectedSender"];
    },
    chats() {
      let selectedReceiverId = this.selectedReceiver.id;
      let selectedSenderId = this.selectedSender.id;
      for (let i = 0; i < this.messages.length; i++) {
        if (
          (this.messages[i].users[0] == selectedReceiverId ||
            this.messages[i].users[0] == selectedSenderId) &&
          (this.messages[i].users[1] == selectedReceiverId ||
            this.messages[i].users[1] == selectedSenderId)
        ) {
          return this.messages[i].messages;
        }
      }
    },
  },
};
</script>
