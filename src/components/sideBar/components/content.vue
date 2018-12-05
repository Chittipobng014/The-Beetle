<template>
  <div class="sidebarcontent sidebarcontentText">
    
  </div>
</template>

<script>
export default {
  name: "content"
};
</script>

<style scoped>
.sidebarcontent {
  background-color: #eae4e4;
  min-height: 74vh;
  padding: 8% 8% 8% 8%;
  position: relative;
}
@media only screen and(max-width: 1024px) {
  .sidebarcontentText {
    font-size: 150%;
  }
}
@media only screen and (max-width: 1366.4px) {
  .sidebarcontentText {
    font-size: 200%;
  }
}
</style>
