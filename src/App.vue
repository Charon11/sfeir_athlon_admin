<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped lang="scss">
  @import "~vue-material/dist/base/theme"; // Apply the theme

  body {
    margin: 0;
  }

  md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  main {
    text-align: center;
  }


</style>
