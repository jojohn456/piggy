import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Master.vue'),
    children: [{ path: '', component: () => import('../views/Index.vue') }],
  },
  {
    path: '/pregnancy-tracker',
    component: () => import('layouts/Master.vue'),
    children: [{ path: '', component: () => import('../views/PregnancyTracker.vue') }],
  },
  {
    path: '/add-mom-pig',
    component: () => import('layouts/Master.vue'),
    children: [{ path: '', component: () => import('../views/AddMomPig.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
