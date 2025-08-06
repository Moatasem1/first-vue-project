<template>
   <input @keyup="emitSearchQuery"
          v-model="searchQuery"
          type="text"
          name=""
          id=""
          class="border border-purple-400 w-full rounded p-2 focus:outline-none focus:border-purple-500 transition-all"
          placeholder="search for any task"
        />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref<string>("");
const emits = defineEmits<{(e:"searched",searhQuery:string):void}>()

function emitSearchQuery(){
  console.log(searchQuery)
emits("searched",searchQuery.value)
}
</script>
