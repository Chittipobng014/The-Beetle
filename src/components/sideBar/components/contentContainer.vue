<template>
  <div class="content-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "content"
};
</script>

<style scoped>
.content-container {
  height: 76vh;
  padding: 0% 5% 5% 5%;
}
</style>
