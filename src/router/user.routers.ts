import AddUser from "@/presentation/user/add-user.vue";
import UpdateUser from "@/presentation/user/update-user.vue";
import UsersList from "@/presentation/user/users-list.vue";
import Users from "@/presentation/user/users.vue";
import type { RouteRecordRaw } from "vue-router";

export const USER_ROUTERS:RouteRecordRaw = {
     path: '/users',
    component: Users ,
    children:[
    {
      path:'',
      component:UsersList
    },
    {
       path:'add',
      name:'AddUser',
      component:AddUser
    },
    {
       path:':id',
       name:'UpdateUser',
      component:UpdateUser
    },
    ]
  }
