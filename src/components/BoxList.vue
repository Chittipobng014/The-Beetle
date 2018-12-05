<template>
    <div style="max-height: 86vh; min-height: 86vh;;background-color: #eae4e4;" id="scroll-target" class="scroll-y">
        <v-card style="border: 0px; background-color: #DBD8D8;">  
            <v-layout row wrap v-scroll:#scroll-target="onScroll">
                <v-flex class="flex-padding" v-for="(box, index) in getBoxes" :key="box.id" xs4>
                  <div v-if="box.status == 'aviable' && openSelection == false">
                    <box style="margin: 5% 7% 5% 7%;" v-bind:index="index" v-bind:price="box.price" v-bind:name="box.name" v-bind:status="box.status" v-bind:uuid="box.id"></box>
                  </div>
                  <div v-if="box.status == 'inuse' && openSelection == true">
                    <box style="margin: 5% 7% 5% 7%;" v-bind:index="index" v-bind:price="box.price" v-bind:name="box.name" v-bind:status="box.status" v-bind:uuid="box.id"></box>
                  </div>
                </v-flex>
            </v-layout>
        </v-card>
    </div> 
</template>
 
<script>
import Box from "./Box";
import { mapActions, mapGetters } from "vuex";
import vuex from '../const/vuex'

export default {
  name: "boxlist",
  data: function() {
    return {
      boxes: []
    };
  },
  methods: {
    ...mapActions(vuex.setters),
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
    ...mapGetters(vuex.getters)
  }
};
</script>

<style>
.flex-padding {
  padding: 0px;
}
</style>
