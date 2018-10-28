<template>
    <div>
        <div class="center">
            <div style="color: #3B5998; font-size: 72px">{{getSelectedBox[0].name}}</div>
            <div style="font-size: 64px; margin-bottom: 25px">{{getSelectedBox[0].price}} Baht/hr</div>
            <div style="font-size: 18px; color: #FF0000; margin-bottom: 35px">Input your to telephone number in case of forgot your box</div>
            <div style="margin-top: 25px; margin-bottom: 10px; margin-left: 20%"><v-text-field
                label="Solo"
                placeholder="Telephone No."
                solo
                style="width: 95%; "
                v-model="tel"
          ></v-text-field></div>
            <div style="margin-bottom: 25px"><v-btn @click="rent()" style="width: 330px; height: 100px; background-color: #3B5998; color: #FFFFFF; font-size: 28px">Rent a box</v-btn></div>
            <div><v-btn @click="this.goback" style="width: 330px; height: 100px; font-size: 28px">Back to box select</v-btn></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "boxrenting",
  props: ["name", "id"],
  data() {
    return {
      tel: ""
    };
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(["setMenu", "setStep", "setData", "clearSelectedBox", "setPeripheral", "setPhonenumber"]),
    rent: async function() {
      if (this.tel.length > 0) {
        this.setPhonenumber(this.tel)
        this.setMenu("faceReg");
        this.setStep("3");
      } else {
        
      }
    },
    goback: function() {
      this.clearSelectedBox();
      this.setMenu("list");
      this.setStep("1");
    }
  },
  computed: {
    ...mapGetters(["isMenu", "isStep", "getData", "getSelectedBox"]),
  }
};
</script>

<style>
.v-inout__control {
  align-items: center;
}

.v-input__slot {
  width: 80%;
}
</style>

