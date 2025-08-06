<template>
  <section class="container p-section">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-semibold">Add User</h1>
     <div class="flex items-center gap-3">
        <RouterLink class="btn btn--secondary-outline" to="/users">Cancel</RouterLink>
       <button @click="submitForm" class="btn btn--primary">Create</button>
     </div>
    </div>
    <UserForm ref="formComponent" @submitted="addUserAsync"/>
  </section>
</template>
<script setup lang="ts">
import { USERS } from '@/application/user/models/user.constants';
import type { ICreatUser } from '@/application/user/models/user.modals';
import UserForm from '@/presentation/user/user-form.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formComponent = ref<InstanceType<typeof UserForm> | null >(null);
const router = useRouter();

function addUserAsync(user:ICreatUser){
  console.log("user created ",user)
  USERS.push({
    id:(USERS.length+1).toString(),
    name: user.firstName + " " + user.lastName,
    email: user.email,
    imagePath: user.image
  });
  router.push('/users');
}

function submitForm(){
   if (formComponent.value) {
    formComponent.value.submitForm()
  }
}
</script>
