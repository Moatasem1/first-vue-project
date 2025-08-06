<template>
 <section class="container p-section min-h-dvh flex flex-col">
  <h2 class="text-3xl font-semibold mb-8">Users</h2>
  <div class="flex gap-3 mb-8">
      <Searchbar class="" @searched="updateSearchQuery"/>
      <RouterLink class="btn btn--primary capitalize" to="/users/add">new</RouterLink>
  </div>
  <ul class="grid grid-cols-3 gap-8 flex-col" :class="{'grow':!users.length || !filteredUsers.length}">
    <li class="flex flex-col cursor-pointer text-center shadow-md border border-gray-300 rounded p-3 hover:scale-105 group transition" v-for="user in filteredUsers" :key="user.id">
      <img class="w-full grow group-hover:grayscale rounded-md mb-2" :src="user.imagePath" :alt="user.name">
      <h2 class="text-xl capitalize mb-3">{{ user.name }}</h2>
      <footer class="flex justify-center items-center gap-4">
        <Trash2 @click="deleteUser(user)"  class=" text-red-500 hover:text-red-600 hover:scale-105 transition-all" :size="19"/>
        <RouterLink :to="{name:'UpdateUser',params:{id:user.id}}">
           <Edit2 class="text-gray-500 hover:text-gray-600 hover:scale-105 transition-all" :size="19"/>
        </RouterLink>
      </footer>
    </li>
    <li v-if="!users.length || !filteredUsers.length" class="grow border border-purple-400 col-span-4 flex items-center justify-center capitalize" >
      <span v-if="!users.length">no users added yet</span>
      <span v-if="users.length && !filteredUsers.length">no user match "{{ searchQuery }}"</span>
    </li>
  </ul>
 </section>
</template>

<script setup lang="ts">
import Searchbar from '@/presentation/shared/searchbar.vue';
import { USERS } from '@/application/user/models/user.constants';
import type { IUserBasicDetails } from '@/application/user/models/user.modals';
import { computed, ref } from 'vue';
import { Trash2,Edit2 } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';


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

 function deleteUser(user:IUserBasicDetails){
    const confirmed = confirm(`Are you sure you want to delete this task?\n${user.name}`)
    if (confirmed)
      deletTaskAsync(user)
 }

 function deletTaskAsync(user:IUserBasicDetails){
  const userIndex = USERS.findIndex(u=>u.id==user.id)
  USERS.splice(userIndex,1);
  users.value = [...USERS];
 }

</script>
