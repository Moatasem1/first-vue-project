<template>
 <section class="container p-section">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-4xl font-semibold">Update User</h1>
     <div class="flex items-center gap-3">
        <RouterLink class="btn btn--secondary-outline" to="/users">Cancel</RouterLink>
       <button @click="submitForm" class="btn btn--primary">Update</button>
     </div>
    </div>
    <UserForm :user="user" ref="formComponent" @submitted="updateUserAsync"/>
  </section>

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ICreatUser, IUser } from '@/application/user/models/user.modals';
import  UserForm from '@/presentation/user/user-form.vue';
import { useRoute, useRouter } from 'vue-router';
import { USERS } from '@/application/user/models/user.constants';

const formComponent = ref<InstanceType<typeof UserForm> | null >(null);
const route = useRoute();
const router  = useRouter()

const userId = computed(() => route.params.id as string);
const user = ref<IUser>()

function submitForm(){
   if (formComponent.value) {
    formComponent.value.submitForm()
  }
}

function fetchUserInfo(){
  const userToFound = USERS.find(u=>u.id==userId.value);
  if(!userToFound) {
    router.push('/users');
    return
  }

  user.value=userToFound;
}

watch(userId,(newId,oldId)=>{
  if(newId && newId !== oldId)
    fetchUserInfo()
  console.log(user)
},{immediate:true});

function updateUserAsync(user:ICreatUser){
  console.log('user updated',user);
  const userToUpdate = USERS.find(u=>u.id==userId.value)!;
  userToUpdate.name = user.firstName + ' '+ user.lastName;
  userToUpdate.email = user.email;
  userToUpdate.imagePath = user.image;
  router.push('/users')
}
</script>
