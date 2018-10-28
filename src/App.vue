<template>
  <transition>
    <main-page></main-page>
  </transition>
</template>

<script>
import MainPage from "./components/MainPage"

export default {
  name: "app",
  async beforeMount() {},
  components: {
    MainPage
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ons-splitter-side[side="left"][animation="overlay"] {
  border-right: 1px solid #bbb;
}
</style>