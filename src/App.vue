<template>
<div>
<!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <leaflet msg="Welcome to Your Vue.js App"/> -->
  <!-- 路由方式来进入不同的组件 -->
  <router-view></router-view>
</div>
  
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import leaflet from './components/leaflet.vue'
import about from './views/About.vue'
import home from './views/Home.vue'
export default {
  name: 'App',
  components: {
    //leaflet
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
