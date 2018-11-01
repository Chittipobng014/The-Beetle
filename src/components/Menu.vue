<template>
    <div class="container center content">
        <div>
            <v-btn v-on:click="nextTolist" class="menu-btn">Rent a box</v-btn>
        </div>
        <div>
            <v-btn v-on:click="nextToOpen" class="menu-btn">Open a box</v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "mainMenu",
  methods: {
    ...mapActions([
        "setMenu",
        "setStep",
        "setIsOpen",
        "setBoxes"
    ]),
    nextTolist: function() {
      this.setMenu("list")
      this.setStep("1")
    },
    nextToOpen: function() {
      this.setIsOpen(true)
      this.setMenu("faceReg")
    }
  },
  beforeMount() {
    this.setBoxes();
  },
};
</script>

<style scoped>
#menu {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.menu-btn {
  width: 35vw;
  height: 13vh;
  background-color: #3b5998;
  margin: 8% 0% 8% 0%;
  font-size: 200%;
  color: #ffffff;
}

.application .theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat),
.theme--light .v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #3b5998;
}
</style>
