<template>
  <div class="flex flex-col">
    <div class="flex w-full">
      <div class="container mx-auto">
        <div
          class="
            flex
            items-center
            text-start
            bg-slate-200
            px-8
            py-4
            w-2/3
            rounded-xl
            m-4
            shadow-md
          "
        >
          <i class="bx bxs-user-circle bx-md px-4" style="color: #000"></i>
          <div class="flex flex-col">
            <h1>contact.title</h1>
            <span> contact.date </span>
          </div>
        </div>

        <div
          class="
            flex flex-col
            px-32
            md:grid
            grid-cols-9
            mx-auto
            p-2
            text-blue-50
          "
          v-for="(message, index) in messages"
          :key="index"
        >
          <div class="flex flex-row-reverse md:contents">
            <div
              class="
                bg-blue-500
                col-start-1 col-end-5
                p-4
                rounded-xl
                my-4
                mr-32
                shadow-md
              "
            >
              <div class="flex gap-2 justify-between">
                <h3 class="font-semibold text-lg">contact/user</h3>
                <p class="leading-tight text-white">
                  {{ message.messages[0].time }}
                </p>
              </div>
              <span class="px-2"> {{ message.messages[0].text }}</span>
            </div>
          </div>
        </div>
      </div>
      <Tabs class="mt-2" />
    </div>

    <div class="absolute bottom-0 w-full">
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
     contacts() {
      return this.$store.getters["contacts/getContacts"];
    },
  },
  created() {
    this.$store.dispatch("messages/loadMessages");
    this.$store.dispatch("contacts/loadContacts");
  },
};
</script>