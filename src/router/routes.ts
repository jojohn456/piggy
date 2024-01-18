import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Master.vue'),
    children: [{ path: '', component: () => import('../views/Index.vue') }],
  },
  {
    path: '/pregnancy-calculator',
    component: () => import('layouts/Master.vue'),
    children: [{ path: '', component: () => import('../views/PregnancyCalculator.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
