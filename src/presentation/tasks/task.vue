<template>
  <div class="flex items-center gap-4 justify-between capitalize p-3 border-b border-purple-400">
    <!-- task name -->
    <h2
      v-if="!isInUpdateMode"
      :class="{
        'border rounded px-3 border-purple-200': isInUpdateMode,
        'focus:outline-none w-full': true,
      }"
      :contenteditable="isInUpdateMode"
    >
      {{ oldTask.name }}
    </h2>
    <div class="w-full">
      <input class="w-full" v-if="isInUpdateMode" type="text" v-model="newTask.name" />
      <p></p>
    </div>

    <div class="flex grow items-center gap-3">
      <!-- task status -->
      <span
        v-if="!isInUpdateMode"
        :class="[
          statusInfo.get(oldTask.status)?.bgColor,
          statusInfo.get(oldTask.status)?.textColor,
          'rounded-full text-nowrap px-3 py-1 text-xs',
        ]"
        >{{ statusInfo.get(oldTask.status)?.displayText }}</span
      >
      <select
        v-model="newTask.status"
        v-if="isInUpdateMode"
        class="text-xs capitalize rounded-full! px-1! py-1!"
      >
        <option v-for="state in statusInfo" :key="state[0]" :value="state[0]">
          {{ state[1].displayText }}
        </option>
      </select>
      <!-- tasks actions -->
      <SquarePen
        v-if="!isInUpdateMode"
        @click="startEditing"
        :size="18"
        class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
      />
      <div v-if="isInUpdateMode" class="flex gap-3 items-center">
        <Check
          @click="keepUpdate"
          :size="18"
          class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
        />
        <X
          @click="neglectUpdate"
          :size="18"
          class="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
        />
      </div>
      <Trash2
        @click="emitDeleted"
        :size="18"
        class="text-red-500 cursor-pointer hover:text-red-600 transition-all"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { Trash2, SquarePen, X, Check } from 'lucide-vue-next'
import { type ITask, TaskStatus, type TaskStatusUIInfo } from './tasks-list.vue'

const props = defineProps<{ task: ITask }>()
const oldTask = ref({ ...props.task })
const newTask = ref(oldTask.value)
const statusInfo = new Map<TaskStatus, TaskStatusUIInfo>([
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

const isInUpdateMode = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'deleted', task: ITask): void
  (e: 'updated', task: ITask): void
}>()

function emitDeleted() {
  emit('deleted', oldTask.value)
}

function emitUpdated() {
  emit('updated', oldTask.value)
}

function neglectUpdate() {
  isInUpdateMode.value = false
}

function startEditing() {
  newTask.value = { ...oldTask.value }
  isInUpdateMode.value = true
}

function keepUpdate() {
  isInUpdateMode.value = false
  if (isTaskChanged()) {
    oldTask.value = newTask.value
    emitUpdated()
  }

  function isTaskChanged() {
    return (
      JSON.stringify(oldTask.value).toLowerCase() != JSON.stringify(newTask.value).toLowerCase()
    )
  }
}
</script>
