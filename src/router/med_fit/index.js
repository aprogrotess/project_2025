export default [
  {
    path: '/med_fit',
    component: () =>
      import(
        /* webpackChunkName: "model1" */ '@/views/med_fit/index.vue'
      )
  }
]
