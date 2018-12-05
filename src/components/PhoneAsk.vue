<template>
    <div>
        <div class="center">
            <div style="font-size: 64px; margin-bottom: 25px">Please Input your phone number</div>
            <div style="font-size: 18px; color: #FF0000; margin-bottom: 35px">Input your to telephone number to verify</div>
            <div style="margin-top: 25px; margin-bottom: 10px; margin-left: 20%"><v-text-field
                label="Solo"
                placeholder="Telephone No."
                solo
                style="width: 95%; "
                v-model="phone"
          ></v-text-field></div>
            <div style="margin-bottom: 25px"><v-btn @click="rent()" style="width: 330px; height: 100px; background-color: #3B5998; color: #FFFFFF; font-size: 28px">Submit</v-btn></div>
            <div><v-btn @click="this.goback" style="width: 330px; height: 100px; font-size: 28px">Back to menu</v-btn></div>
        </div>
        <v-dialog
            v-model="fail"
            width="500"
            >
                <v-card>
                    <v-card-title
                    class="headline grey lighten-2 center"
                    primary-title
                    >
                        Sorry
                    </v-card-title>

                    <v-card-text class="center">
                        You did not rent our box yet or phone number is wrong
                    </v-card-text>
                </v-card>
      </v-dialog>
    </div>
</template>

<script>
import vuex from "../const/vuex";
import { mapGetters, mapActions } from "vuex";
import http from "./API/common";

export default {
  name: "phoneAsk",
  data() {
    return {
      phone: "",
      fail: false
    };
  },
  methods: {
    ...mapActions(vuex.setters),
    rent: async function() {
      try {
        this.showLoading();
        const data = await http.gettransactionByphone(this.phone);
        console.log(data);
        let transactions = data.data.transactions;
        if (transactions.length == 0) {
          this.fail = true;
          setTimeout(() => {
            this.setMenu("hello");
            this.setStep("1");
            this.setIsOpen(false);
            this.setOpenByPasscode(false);
          }, 5000);
        } else {
          const boxid = [];
          transactions.forEach(e => {
            boxid.push({ boxid: e.boxid });
          });
          this.setBoxes(boxid);
          let setState = await this.selectOpenBoxes(true);
          if (setState) {
            this.setMenu("list");
            this.setStep("2");
          }
        }
      } catch (error) {
        console.log("phoneask");
        console.log(error);
        this.setMenu("hello");
        this.setStep("1");
        this.setIsOpen(false);
        this.setOpenByPasscode(false);
      }
    },
    goback: function() {
      this.setMenu("hello");
      this.setStep("1");
      this.setIsOpen(false);
      this.setOpenByPasscode(false);
    }
  },
  omputed: {
    ...mapGetters(vuex.getters)
  },mounted() {
      this.hideLoading()
  },
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
