import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Button from 'ant-design-vue/lib/button';
import Input from 'ant-design-vue/lib/input';
import 'ant-design-vue/dist/antd.css';
//第一种
import VueVideoPlayer from 'vue-video-player'
//第2种
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.config.productionTip = false
Vue.component(Button.name, Button); //注册
Vue.component(Input.name, Input); //注册
Vue.prototype.$video = Video

new Vue({
  VueVideoPlayer,
  router,
  render: h => h(App)
}).$mount('#app')
