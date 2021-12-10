export default [
  {
    path: '/med',
    component: () =>
      import(
        /* webpackChunkName: "model1" */ '@/views/med/index.vue'
      )
  }
]
