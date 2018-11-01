<template>
  <div class="aviableBox" @click="next()">
    <div class="bottomRight textSize">
      {{boxNo}}
    </div>
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
    ...mapGetters(["isMenu", "isStep", "data"]),
    boxNo: function(){
      let number = this.name.split(".")[1]
      return number
    }
  }
};
</script>

<style scoped>
.aviableBox{
  height: 21vh;  
  background-color: #33c0ca;
  border: white 3px solid;
  position: relative;
}

.bottomRight{
  right: 0;
  bottom: 0;
  position: absolute;
}

.textSize{
  display: inline-block;
  color: white;
  font-size: 950%;
  line-height: 69%;
}
</style>

