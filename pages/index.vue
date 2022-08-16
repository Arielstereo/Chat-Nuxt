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
            shadow-md
          "
        >
          <img class="w-12 h-12 rounded-full" :src="selectedContact.img" />
          <div class="flex flex-col">
            <h1>{{ selectedContact.title }}</h1>
            <span>{{ selectedContact.date }}</span>
          </div>
        </div>
      </div>
      <Tabs class="mt-2" />
    </div>

    <div class="w-5/6 absolute bottom-0 mt-8">
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
    selectedContact() {
      return this.$store.getters["contacts/getSelectedContact"];
    },
  },
};
</script>
