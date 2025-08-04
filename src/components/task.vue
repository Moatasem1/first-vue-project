<template>
  <div class="flex items-center justify-between capitalize p-3 border-b border-purple-400">
    <h2
      :class="{
        'border rounded px-3 border-purple-200': isInUpdateMode,
        'focus:outline-none': true,
      }"
      :contenteditable="isInUpdateMode"
    >
      {{ task.name }}
    </h2>
    <div class="flex items-center gap-3">
      <span
        :class="[
          getTaskStatusAsString(task.status).bgColor,
          getTaskStatusAsString(task.status).textColor,
          'rounded-full px-3 py-1 text-xs',
        ]"
        >{{ getTaskStatusAsString(task.status).displayText }}</span
      >
      <SquarePen
        v-if="!isInUpdateMode"
        @click="isInUpdateMode = true"
        :size="18"
        class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
      />
      <div v-if="isInUpdateMode" class="flex gap-3 items-center">
        <Check
          @click="(emitUpdated(), (isInUpdateMode = false))"
          :size="18"
          class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
        />
        <X
          @click="isInUpdateMode = false"
          :size="18"
          class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
        />
      </div>
      <Trash2
        @click="emitDeleted()"
        :size="18"
        class="text-red-500 cursor-pointer hover:text-red-600 transition-all"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskStatus, type ITask, type TaskStatusUIInfo } from '@/App.vue'
import { defineProps, ref } from 'vue'
import { Trash2, SquarePen, X, Check } from 'lucide-vue-next'

const { task } = defineProps<{ task: ITask }>()
const isInUpdateMode = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'deleted', task: ITask): void
  (e: 'updated', task: ITask): void
}>()

function emitDeleted() {
  emit('deleted', task)
}

function emitUpdated() {
  emit('updated', task)
}

function getTaskStatusAsString(taskStatus: TaskStatus): TaskStatusUIInfo {
  const statusWords = new Map<TaskStatus, TaskStatusUIInfo>([
    [
      TaskStatus.notStarted,
      {
        displayText: 'not started',
        textColor: 'text-white',
        bgColor: 'bg-gray-500/80',
      },
    ],
    [
      TaskStatus.inProgress,
      {
        displayText: 'in progress',
        textColor: 'text-white',
        bgColor: 'bg-orange-500/80',
      },
    ],
    [
      TaskStatus.completed,
      {
        displayText: 'completed',
        textColor: 'text-white',
        bgColor: 'bg-green-500/80',
      },
    ],
  ])

  return statusWords.get(taskStatus)!
}
</script>
