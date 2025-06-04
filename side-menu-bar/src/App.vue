<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
import Index from './view/index.vue'

export default {
  name: 'App',
  components: {
    Index
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: url('assets/bg.png') no-repeat;
  background-size: 100vw 100vh;
}
</style>
