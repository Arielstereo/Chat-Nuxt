<template>
  <div class="flex flex-col">
    <div class="flex w-full">
      <div
        class="container mx-auto">
        <h1 class="text-center bg-slate-200 p-4 rounded-xl m-4 shadow-md">
          Linn Ronning
        </h1>
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
           v-for="message in messages"
        :key="message.id"
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
               <div class="flex justify-between">
               <h3 class="font-semibold text-lg mb-1">contact/user</h3>
              <span> {{ message.messages[0].time }}</span>
             </div>
              <p class="leading-tight text-justify text-white">
                {{ message.messages[0].text }}
              </p>
            </div>
          </div>

          <div class="flex flex-row-reverse md:contents">
            <div
              class="
                bg-blue-500
                col-start-1 col-end-5
                p-4
                rounded-xl
                my-4
                ml-auto
                shadow-md
              "
            >
             <div class="flex justify-between">
               <h3 class="font-semibold text-lg mb-1">contact/user</h3>
              <span> {{ message.messages[1].time }}</span>
             </div>
              <p class="leading-tight text-justify">
                {{ message.messages[1].text }}
               
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs class="mt-20" />
    </div>

    <div>
      <div class="mt-16 px-8">
        <form class="flex items-center">
          <input
            class="w-3/4 h-14 m-8 p-6 rounded-3xl border-2 focus:bg-gray-100"
            placeholder="Say something.."
          />

          <button type="submit" class="rounded-full bg-blue-400 p-2">
            <i class="bx bx-chevron-right bx-md" style="color: #ffffff"></i>
          </button>
        </form>
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
      contacts: [],
      messages: [],
    };
  },
  async mounted() {
    await axios.get(apiContacts).then((response) => {
      this.contacts = response.data.data;
    });
    await axios.get(apiConversations).then((response) => {
      this.messages = response.data.data;
    });
  },
};
</script>