<template>
  <v-card class="sidebar">
    <div class="sidebarheader">
      <div style="margin-top: 4%">
        <img class="sidebar-logo" src="../../assets/Logo/logo.png">
      </div>
      <div class="sidebar-text">SMART MOBILE LOCKER</div>
    </div>
    <div class="sidebartitle center">Instruction</div>
    <div class="content-container">
      <div class="sidebarcontent sidebarcontentText">
        <slot></slot>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "sideBar",
};
</script>

<style scoped>
.sidebar {
  max-height: 99vh;
  min-height: 100vh;
  border: 0px;
  background-color: #3b5998;
}
.sidebarheader {
  min-height: 14vh;
  max-height: 14vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-logo {
  height: 12vh;
  width: 8vw;
}
.content-container {
  height: 76vh;
  padding: 0% 5% 5% 5%;
}
.sidebarcontent {
  background-color: #eae4e4;
  min-height: 74vh;
  padding: 8% 8% 8% 8%;
  position: relative;
}
@media only screen and (max-width: 1366.4px) {
  .sidebar-text {
    font-size: 200%;
  }
  .sidebarcontentText {
    font-size: 200%;
  }
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

@media only screen and (max-width: 1024px) {
  .sidebar-text {
    font-size: 150%;
  }
  .sidebarcontentText {
    font-size: 150%;
  }
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
