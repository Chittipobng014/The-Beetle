<template>
  <div class="sidebartitle center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "subHeader"
};
</script>

<style scoped>
@media only screen and (max-width: 1366.4px) {
  .sidebartitle {
    min-height: 10vh;
    max-height: 10vh;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 330%;
    color: #ffffff;
  }
}
@media only screen and (max-width: 1024) {
  .sidebartitle {
    min-height: 10vh;
    max-height: 10vh;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 250%;
    color: #ffffff;
  }
}
</style>
