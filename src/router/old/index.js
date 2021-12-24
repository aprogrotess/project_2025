export default [
  {
    path: '/old',
    component: () =>
      import(
        /* webpackChunkName: "model1" */ '@/views/old/index.vue'
      )
  }
]
