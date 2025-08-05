<template>
 <section class="container py-12 min-h-dvh flex flex-col">
  <h2 class="text-4xl font-bold mb-8">Users</h2>
  <Searchbar class="mb-8" @searched="updateSearchQuery"/>
  <ul class="grid grid-cols-4 gap-8 grow flex flex-col">
    <li class="text-center shadow" v-for="user in filteredUsers" :key="user.id">
      <img class="w-full rounded-md mb-2" :src="user.imagePath" :alt="user.name">
      <h2 class="text-xl ">{{ user.name }}</h2>
    </li>
    <li v-if="!users.length || !filteredUsers.length" class="grow border col-span-4 flex items-center justify-center capitalize" >
      <span v-if="!users.length">no users added yet</span>
      <span v-if="users.length && !filteredUsers.length">no user match "{{ searchQuery }}"</span>
    </li>
  </ul>
 </section>
</template>

<script setup lang="ts">
import Searchbar from '@/components/searchbar.vue';
import { USERS } from '@/constants/user.constants';
import type { IUserBasicDetails } from '@/modals/user.modals';
import { computed, ref } from 'vue';

  const searchQuery = ref<string>("")

 const users = ref<IUserBasicDetails[]>(USERS);
  const filteredUsers = computed(() =>
    users.value.filter(u =>
      u.name.toLowerCase().trim().includes(searchQuery.value.trim().toLowerCase())
    )
  );


 function updateSearchQuery(searchText:string){
  console.log(searchText)
  searchQuery.value = searchText;
 }

</script>
