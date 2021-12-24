export default [
  {
    path: '/segment',
    component: () =>
      import(
        /* webpackChunkName: "model1" */ '@/views/segment/index.vue'
        )
  }
]
