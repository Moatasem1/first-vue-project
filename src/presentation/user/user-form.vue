<template>
  <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-12">
    <div class="space-y-4">
      <div>
        <label class="mb-2 block text-lg" for="">first name</label>
        <input @input="validateFeild('firstName')" v-model="form.firstName" type="text" class="input--lg w-full"  placeholder="first name"/>
        <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
      </div>
      <div>
        <label class="mb-2 block text-lg" for="">last name</label>
        <input @input="validateFeild('lastName')" v-model="form.lastName" type="text" class="input--lg w-full"  placeholder="last name"/>
        <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
      </div>
      <div>
        <label class="mb-2 block text-lg" for="">email</label>
        <input @input="validateFeild('email')" v-model="form.email" type="email" class="input--lg w-full"  placeholder="email"/>
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <label class="mb-2 block text-lg" for="">image</label>
      <div class="relative border border-dashed border-gray-500 rounded grow flex flex-col">
        <Trash2 v-if="imagePreview" @click="removeImage" :size="18" class="z-4 absolute top-3 right-3 text-red-500 hover:text-red-600 cursor-pointer hover:scale-105"/>
        <label class="grow flex items-center justify-center">
              <img v-if="imagePreview" accept="image/*" class="absolute top-0 left-0 w-full h-full" :src="imagePreview" alt="">
              <span v-if="!imagePreview" class="capitalize">Upload an image</span>
              <input @change="changeImage" type="file" class="input--lg hidden w-full"/>
          </label>
      </div>
      <span class="error" v-if="errors.image">{{ errors.image }}</span>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import type { ICreatUser, IUser } from '@/application/user/models/user.modals';
import { ValidationService } from '../helpers/validation-service';

const props = defineProps<{user?:IUser}>();

 const form = reactive<ICreatUser>(
  {
    firstName:'',
    lastName:'',
    email:'',
    image:''
  }
 );

  onMounted(()=>{
    assignFormWithValues()
  })

 watch(
  ()=>props.user,
  ()=>{
    debugger
    assignFormWithValues()
  },
 )


  function assignFormWithValues(){
  if(!props.user) return;
      form.firstName=props.user.name.split(' ')[0]
      form.lastName=props.user.name.split(' ')[1]
      form.email=props.user.email
      form.image= props.user.imagePath
      imagePreview.value = props.user.imagePath ?? null
 }


  const errors = reactive<ICreatUser>(
  {
    firstName:'',
    lastName:'',
    email:'',
    image:''
  }
  )

  const isFormValid =()=>{
    for(const key in errors)
      if(errors[key as keyof typeof errors]!='') return false;

    return true;
  };

 const emit = defineEmits<{(e:'submitted',user:ICreatUser):void}>();
 const imagePreview = ref<string|null>(null)

function validateFeild(fieldName:string){
  switch(fieldName){
    case 'firstName':
    errors.firstName= ValidationService.validateField(form.firstName,[ValidationService.required,ValidationService.minLength(3),ValidationService.maxLength(50)])
    break;
    case 'lastName':
    errors.lastName= ValidationService.validateField(form.lastName,[ValidationService.required,ValidationService.minLength(3),ValidationService.maxLength(50)])
    break
    case 'email':
    errors.email = ValidationService.validateField(form.email,[
      ValidationService.required,ValidationService.email
    ])
    break
  }
}

function submitForm() {
  // check if form valid first logic should go here
    validateFeild('firstName');
    validateFeild('lastName');
    validateFeild('email');

    if(!isFormValid()) return;

  const createdUser : ICreatUser = {
    image:form.image,
    firstName: form.firstName,
    lastName: form.lastName,
    email:form.email
  };
  emit("submitted",createdUser);
}

function changeImage(event:Event){
   const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if(!file || !file.type.startsWith('image/')){
    imagePreview.value=null
    form.image = undefined
    return;
  }

  const reader = new FileReader();

  reader.onload=()=>{
    imagePreview.value = reader.result as string
    form.image = imagePreview.value
  }

  reader.readAsDataURL(file)
}

function removeImage(){
  imagePreview.value=null
  form.image = undefined
}

defineExpose({submitForm})

</script>
