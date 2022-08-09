<template>
  <div class="flex flex-col">
    <div class="flex w-full">
      <div class="container mx-auto">
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
              v-for="message in messages"
              :key="message.id"
            >
              <h3 class="font-semibold text-lg mb-1">Lorem ipsum</h3>
              <p class="leading-tight text-justify">
                {{ message.messages }}
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
              <h3 class="font-semibold text-lg mb-1">Lorem ipsum</h3>
              <p class="leading-tight text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                quaerat?
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
                mr-32
                shadow-md
              "
            >
              <h3 class="font-semibold text-lg mb-1">Lorem ipsum</h3>
              <p class="leading-tight text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                quaerat?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs class="mt-20" />
    </div>

    <div>
      <div class="px-8">
        <form class="flex items-center">
          <input
            class="w-3/4 h-14 m-8 p-6 rounded-3xl border-2"
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

<style>
/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}
/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}
</style>
