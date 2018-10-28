<template>
<div>
    <v-card flat tile class="h-center" style="text-align:center; margin: 0px;  height: 21vh;  background-color: #33c0ca"> 
      {{name}}      
        <v-btn @click="next()">click</v-btn>
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
