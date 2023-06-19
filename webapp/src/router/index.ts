import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/Layout.vue"),
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home
        },
        {
          path: "/profile",
          name: "Profile",
          component: Profile
        },
      ]
    },
  ]
})

export default router
