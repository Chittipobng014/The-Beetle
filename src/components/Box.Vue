<template>
  <div class="aviableBox" @click="next()">
    <div class="bottomRight textSize">
      {{boxNo}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vuex from "../const/vuex";
import ble from "./ble/ble";
import http from "./API/common";

export default {
  name: "box",
  props: {
    name: String,
    status: String,
    uuid: String,
    price: Number,
    index: Number
  },
  data() {
    return {
      id: this.uuid
    };
  },
  methods: {
    ...mapActions(vuex.setters),

    next: async function() {
      if (this.openSelection == true && this.openByPasscode == false) {
        this.showLoading();
        const peripheral = await ble.bleConnect(this.id);
        const checkout = await http.checkoutByBoxid(this.id);
        this.setPeripheral(peripheral);
        this.setBoxState("OPEN");
        this.setUpdateBoxs(true);
        this.hideLoading();
        console.log(checkout.status);
        await this.selectOpenBoxes(false);
        if (checkout.status != 200) {
          this.setIsOpen(false);
          this.setMenu("hello");
          this.setStep("1");
        } else {
          this.showThanksAlert();
          setTimeout(() => {
            this.setIsOpen(false);
            this.hideThanksAlert();
            this.setMenu("hello");
            this.setStep("1");
          }, 3000);
        }
      } else if (this.openByPasscode == true && this.openSelection == true) {
        let box = {
          id: this.id,
          name: this.name,
          price: this.price
        };
        console.log(`ELSE IF ${box}`);
        this.setSelectedBox(box);
        this.setMenu("passcode");
        this.setStep("3")
      } else {
        let box = {
          id: this.id,
          name: this.name,
          price: this.price
        };
        console.log(`ELSE ${box}`);
        this.setSelectedBox(box);
        this.setMenu("renting");
        this.setStep("2");
      }
    }
  },
  mounted() {
    console.log(this.openSelection);
  },

  computed: {
    ...mapGetters(vuex.getters),
    boxNo: function() {
      let number = this.name.split(".")[1];
      return number;
    }
  }
};
</script>

<style scoped>
.aviableBox {
  height: 21vh;
  background-color: #33c0ca;
  border: white 3px solid;
  position: relative;
}

.bottomRight {
  right: 0;
  bottom: 0;
  position: absolute;
}

.textSize {
  display: inline-block;
  color: white;
  font-size: 950%;
  line-height: 69%;
}
</style>

