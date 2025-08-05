<template>
  <div class="flex items-center gap-3 border-b border-purple-400 pb-3">
    <input
      v-model="taskForm.name"
      ref="input"
      type="text"
      class="w-full border-none focus:outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
export interface ICreateTask {
  name: string
}
const input = ref<HTMLInputElement>()
const taskForm = ref<ICreateTask>({ name: '' })
const emit = defineEmits<{
  (e: 'added', task: ICreateTask): void
  (e: 'closed'): void
}>()

onMounted(() => {
  input.value?.focus()
  // Delay adding the click listener to avoid immediately triggering the close event
  // when the new button is clicked
  setTimeout(() => {
    document.addEventListener('click', handelClickOutside)
  }, 0)
})

function handelClickOutside(event: MouseEvent) {
  if (!input.value || input.value.contains(event.target as Node)) return

  if (taskForm.value?.name.trim()) emit('added', taskForm.value)

  emit('closed')
}
</script>
