<template>
  <div class="sidebarheader">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "sideBarHeader"
};
</script>

<style scoped>
.sidebarheader {
  min-height: 14vh;
  max-height: 14vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

