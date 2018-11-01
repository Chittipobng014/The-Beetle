<template>
<div>
    <v-card v-if="status == 'aviable'" flat tile class="center" style="text-align:center; padding-top: 5vh; height: 21vh;  background-color: #33c0ca"> 
      <div>
        {{name}} 
      </div>
      <div>
        <v-btn @click="next()">click</v-btn>
      </div>
    </v-card>
    <v-card v-if="status == 'inuse'" flat tile class="center" style="text-align:center; padding-top: 9vh; margin: 0px;  height: 21vh;  background-color: #878787"> 
      <div>
        {{name}}
      </div>
    </v-card>
    <v-card v-if="status == 'lock'" flat tile class="center" style="text-align:center; padding-top: 9vh; margin: 0px;  height: 21vh;  background-color: #ce2121"> 
      <div>
        {{name}}
      </div>
    </v-card>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    ...mapActions(["setMenu", "setStep", "setData", "setSelectedBox"]),

    next: function() {
      let box = {id: this.id, name: this.name, price: this.price, status: "1"}
      console.log(box)
      this.setSelectedBox(box)
      this.setMenu("renting");
      this.setStep("2");
    }
  },
  mounted() {},

  computed: {
    ...mapGetters(["isMenu", "isStep", "data"])
  }
};
</script>
