// import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: {
        requireAdmin: true
      }
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/NewArticleView.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/post/:id',
      component: () => import('../views/ArticleView.vue'),
      props: true
    },
     {
      path: '/user/:id',
      component: () => import('../views/UsersView.vue'),
    },
  ],
})

// router.beforeEach((to, _from, next) => {
//  if(to.meta.requireAuth) {
//    const userStore = useUserStore();
//
//    if (userStore.isAutorized) {
//      next()
//    } else {
//      next('/login')
//    }
//  } else {
//    next()
//  }
// })

export default router
