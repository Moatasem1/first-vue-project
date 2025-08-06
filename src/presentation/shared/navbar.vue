<template>
  <nav class="border-b border-gray-300 py-2 shadow-md sticky top-0 bg-white z-100">
    <div class="container flex justify-between items-center gap-3">
      <span class="text-2xl font-bold">TODO</span>
      <ul class="flex items-center gap-4">
        <li  class="capitalize text-gray-900 hover:text-purple-600 transition" v-for="menu in navbarMenuItems" :key="menu.path">
         <RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { NANBAR_MENU_ITEMS } from './shared.constants';
import { RouterLink } from 'vue-router';

const navbarMenuItems = ref(NANBAR_MENU_ITEMS)
</script>
