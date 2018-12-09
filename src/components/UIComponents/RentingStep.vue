<template>
  <div>
    <div v-if="isMenu != 'phoneask' && isOpen == false" ref="step">
      <div class="inActive" id="0" ref="1">1. Select a Beetle box</div>
      <div id="1" ref="2">2. Comfirm renting</div>
      <div id="2" ref="3">3. Face Recognition</div>
      <div id="3" ref="4">4. Set passcode</div>
      <div id="4" ref="5">5. Confirm passcode</div>
      <div id="5" ref="6">6. Success</div>
      <div
        v-if="isStep == 1 || isStep == 2 || isStep == 3 || isStep == 4 || isStep == 5"
        style="position: absolute;    bottom: 0;   width: 85%"
      >
        <v-btn
          v-on:click="backToMenu"
          style=" width: 100%; height: 6vh; background-color: #3B5998; margin: 8% 0% 8% 0%; font-size: 100%; color: #FFFFFF;"
          class="menu-btn"
        >Back to menu</v-btn>
      </div>
    </div>
    <div
      v-if="(isMenu == 'phoneask' || isMenu == 'list') && isOpen == true"
    >
      <div>Please input your phone number to identify yourself and select your box then enter the passcode</div>
      <div style="position: absolute;    bottom: 0;   width: 85%">
        <v-btn
          v-on:click="backToMenu"
          style=" width: 100%; height: 6vh; background-color: #3B5998; margin: 8% 0% 8% 0%; font-size: 100%; color: #FFFFFF;"
          class="menu-btn"
        >Back to menu</v-btn>
      </div>
    </div>
    <div v-if="isMenu == 'passcode' && isOpen == true">
      <div>Please enter the passcode</div>
      <div style="position: absolute;    bottom: 0;   width: 85%">
        <v-btn
          v-on:click="backToMenu"
          style=" width: 100%; height: 6vh; background-color: #3B5998; margin: 8% 0% 8% 0%; font-size: 100%; color: #FFFFFF;"
          class="menu-btn"
        >Back to menu</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "rentingstep",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions([
      "setMenu",
      "setStep",
      "setData",
      "clearSelectedBox",
      "isOpen",
      "setIsOpen"
    ]),
    backToMenu: function() {
      this.setIsOpen(false);
      this.clearSelectedBox();
      this.setMenu("hello");
      this.setStep("0");
    }
  },
  watch: {
    isStep: async function(step, previusStep) {
      if (this.isMenu != "phoneask") {
        var step = parseInt(step) - 1;
        var previusStep = parseInt(previusStep) - 1;
        var instruction = this.$refs.step.children[step];
        var prev = this.$refs.step.children[previusStep];
        if (previusStep < 0) {
          instruction.classList.add("inActive");
        } else {
          instruction.classList.add("inActive");
          prev.classList.remove("inActive");
        }
      } else if (this.isMenu == "phoneask") {
      }
    }
  },
  computed: {
    ...mapGetters(["isMenu", "isStep", "data", "isOpen"])
  },
  mounted() {
    this.setStep("1");
  }
};
</script>
