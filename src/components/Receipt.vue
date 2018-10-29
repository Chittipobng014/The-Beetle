<template>
    <div class="container">
        <div class="center">
            <div><img src="../assets/Logo/logo.png" alt="" style="width: 35%; height: 35%"></div>
            <div style="color: green; font-size: 350%">Successfully</div>
            <div class="margin" style="font-size: 250%">{{getSelectedBox.name}}</div>
            <div style="font-size: 250%">Box will open in {{time}} second</div>
            <v-dialog
            v-model="alert"
            width="500"
            >
                <v-card>
                    <v-card-title
                    class="headline grey lighten-2 center"
                    primary-title
                    >
                        Thank you
                    </v-card-title>

                    <v-card-text class="center">
                        Thank you for choosing us. Your box is opened
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vuex from "../const/vuex"

export default {
  name: "receipt",
  data() {
    return {
      time: 5,
      alert: false
    };
  },
  computed: {
    ...mapGetters(vuex.getters)
  },
  mounted() {
    this.countdown();
  },
  methods: {
    ...mapActions(vuex.setters),
    countdown: function() {
      var timer = setInterval(() => {
        this.time -= 1;
        if (this.time == 0) {
          this.showAlert();
          clearInterval(timer);
        }
      }, 1000);
    },
    showAlert: async function() {
      this.alert = true;
      setTimeout(() => {
        this.setMenu("hello");
        this.setStep("0");
        this.alert = false;
      }, 3000);
    }
  }
};
</script>
 
 <style scoped>
.margin {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
 