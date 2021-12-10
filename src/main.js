import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import VueRouter from 'vue-router'
import axios from 'axios'
import Element from 'element-ui'
import echarts from 'echarts'
import './components'
import './assets/icons'
import './lib/element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../src/assets/style.css'
import './theme/index.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
Vue.prototype.$echarts = echarts
Vue.use(Element)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 打包生产环境不需要Mock
if (process.env.NODE_ENV !== 'production') import('./mock')
Vue.component('App', App);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
