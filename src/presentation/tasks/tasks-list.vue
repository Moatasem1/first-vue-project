<template>
  <section class="p-section min-h-dvh flex flex-col">
    <div class="container grow flex flex-col">
      <h1 class="text-3xl font-semibold mb-8">Tasks List</h1>
      <div class="mb-8 flex gap-3">
        <input
          v-model="searchQuery"
          type="text"
          name=""
          id=""
          class="border border-purple-400 w-full rounded p-2 focus:outline-none focus:border-purple-500 transition-all"
          placeholder="search for any task"
        />
        <button :disabled="isAddModeActive" @click="activatedAddMode" class="btn btn--primary">
          New
        </button>
      </div>
      <ul class="space-y-4 grow flex flex-col">
        <li>
          <addTask @added="addTaskToList" @closed="deactivatedAddMode" v-if="isAddModeActive" />
        </li>
        <li v-for="task in filteredTasks" :key="task.id">
          <task :task="task" @deleted="showDeleteModal" @updated="updateTask" />
        </li>
        <li
          class="border grow capitalize border-purple-400 p-5 rounded flex justify-center items-center"
          v-if="!filteredTasks.length"
        >
          <span v-if="!tasks.length">you don't have any task</span>
          <span v-if="tasks.length && !filteredTasks.length"
            >no task match "{{ searchQuery }}"</span
          >
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
export enum TaskStatus {
  notStarted = 1,
  inProgress,
  completed,
}

export interface TaskStatusUIInfo {
  displayText: string
  textColor: string
  bgColor: string
}

export interface ITask {
  id: string
  name: string
  status: number
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ICreateTask } from '@/presentation/tasks/add-task.vue'
import addTask from '@/presentation/tasks/add-task.vue'
import task from './task.vue'

const tasks = ref<ITask[]>([
  {
    id: '1',
    name: 'task 1',
    status: 1,
  },
  {
    id: '2',
    name: 'task 2',
    status: 2,
  },
  {
    id: '3',
    name: 'task 3',
    status: 1,
  },
  {
    id: '4',
    name: 'task 4',
    status: 2,
  },
  {
    id: '5',
    name: 'task 5',
    status: 3,
  },
  {
    id: '6',
    name: 'task 6',
    status: 1,
  },
  {
    id: '7',
    name: 'task 7',
    status: 2,
  },
  {
    id: '8',
    name: 'task 8',
    status: 2,
  },
  {
    id: '9',
    name: 'task 9',
    status: 1,
  },
])

const filteredTasks = computed(() =>
  tasks.value.filter((t) =>
    t.name.toLowerCase().trim().includes(searchQuery.value.trim().toLowerCase()),
  ),
)

const searchQuery = ref<string>('')

const isAddModeActive = ref<boolean>(false)

function showDeleteModal(task: ITask) {
  const confirmed = confirm(`Are you sure you want to delete this task?\n${task.name}`)
  if (confirmed) {
    deleteTask(task.id)
  }
}

function deleteTask(taskId: string) {
  tasks.value = tasks.value.filter((t) => t.id !== taskId)
}

function updateTask(task: ITask) {
  console.log('task updated')
  tasks.value = tasks.value.map((t) => (t.id == task.id ? task : t))
}

function activatedAddMode() {
  isAddModeActive.value = true
}
function deactivatedAddMode() {
  isAddModeActive.value = false
}

function addTaskToList(task: ICreateTask) {
  tasks.value = [
    {
      id: (tasks.value.length + 1).toString(),
      name: task.name,
      status: TaskStatus.notStarted,
    },
    ...tasks.value,
  ]
}
</script>
