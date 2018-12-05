<template>
  <div>
    <div style="margin-top: 4%">
      <img class="sidebar-logo" src="../../../assets/Logo/logo.png">
    </div>
    <div class="sidebar-text">SMART MOBILE LOCKER</div>
  </div>
</template>

<script>
export default {
  name: "logo"
};
</script>

<style scoped>
.sidebar-logo {
  height: 12vh;
  width: 8vw;
}
@media only screen and (max-width: 1366.4px) {
  .sidebar-text {
    font-size: 200%;
  }
}

@media only screen and (max-width: 1024px) {
  .sidebar-text {
    font-size: 150%;
  }
}
</style>
