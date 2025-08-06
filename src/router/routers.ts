import type { RouteRecordRaw } from "vue-router";
import { USER_ROUTERS } from "./user.routers";
import { TASK_ROUTERS } from "./task.router";

export const ROUTES: Array<RouteRecordRaw> = [
  { path: '', redirect: '/tasks'  },
  TASK_ROUTERS,
  USER_ROUTERS,
  { path: '/:pathMatch(.*)*', redirect: '/tasks' },
]
