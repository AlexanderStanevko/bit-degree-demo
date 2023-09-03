import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'IndexPage',
          component: () => import('pages/IndexPage.vue'),
        },
      ],
    },
    {
      path: '/:catchAll(.*)*',
      name: 'ErrorPage',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ]
})

export default router
