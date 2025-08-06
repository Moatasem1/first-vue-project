import TasksList from "@/presentation/tasks/tasks-list.vue";
import Tasks from "@/presentation/tasks/tasks.vue";
import type { RouteRecordRaw } from "vue-router";

export const TASK_ROUTERS :RouteRecordRaw={
   path: '/tasks',
   component: Tasks,
   children:[
    {
      path:'',
      component: TasksList
    }
   ]
  };
