<template>
    <div style="max-height: 86vh; min-height: 86vh;;background-color: #DBD8D8;" id="scroll-target" class="scroll-y">
        <v-card style="border: 0px; background-color: #DBD8D8;">  
            <v-layout row wrap v-scroll:#scroll-target="onScroll">
                <v-flex class="flex-padding" v-for="(box, index) in boxes" :key="box.uuid" xs4>
                    <box style="margin: 5% 5% 5% 5%;" v-bind:index="index" v-bind:price="box.price" v-bind:name="box.name" v-bind:status="box.status" v-bind:uuid="box.id"></box>
                </v-flex>
            </v-layout>
        </v-card>
    </div> 
</template>
 
<script>
import Box from "./Box";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "boxlist",
  data: () => {
    return {
      boxes: []
    };
  },
  methods: {
    ...mapActions(["setMenu", "setStep", "setData"]),
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    }
  },
  async beforeMount() {
    this.boxes = this.getBoxes;
  },
  components: {
    Box
  },
  mounted() {
    
  },
  computed: {
    ...mapGetters(["getBoxes"])
  }
};
</script>

<style>
.flex-padding {
  padding: 0px;
}
</style>
