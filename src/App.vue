<template>
  <div id="app">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import {t1} from "./router"
export default {
  name: 'App',
  mounted(){
    this.$router.addRoutes(t1)
    while(t1.length!=0) {
      this.$router.options.routes.push(t1.pop());
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

