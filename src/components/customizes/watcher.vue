<template>
  
</template>

<script>
import vuex from "../../const/vuex"
import configvars from "../../const/configvars"
import { mapGetters, mapActions } from "vuex"
import ble from "../ble/ble"
import http from '../API/common'


export default {
  computed: {
    ...mapGetters(vuex.getters)
  },
  methods: {
    ...mapActions(vuex.setters)
  },
  watch: {
    isMenu: async function(menu) {
      if (menu == "checkpasscode") {
      console.log(menu)
        //check passcode
        if (this.repasscode != "" && this.passcode != "") {
          this.dialog = true;
          if (this.repasscode == this.passcode) {
            // passcode match
            this.setUpdateTransactions(true);
            this.setUpdateBoxs(true);
            setTimeout(() => {
              this.dialog = false;
              this.setMenu("receipt");
              this.setStep("6");
            }, 1000);
          } else {
            // passcode not match
            setTimeout(() => {
              console.log("not match");
              this.setMenu("passcode");
              this.setStep("4");
              this.dialog = false;
            }, 1000);
          }
        }
      } else if (menu == "openByPasscode" && this.isOpen == true) {
        var transactionVadilate = this.checkTransactionPasscode(this.passcode);
        if (transactionVadilate == true) {
          this.alert = true;
          this.setUpdateTransactions(true);
          this.setUpdateBoxs(true);
          setTimeout(() => {
            this.setMenu("hello");
            this.setIsOpen(false);
            this.alert = false;
          }, 2000);
        } else {
          this.setMenu("passcode");
          this.passcodeAttempInc();
        }
      } else if (menu == "renting") {
        try {
          const connect = await ble.bleConnect(getters.getSelectedBox.id);
        } catch (error) {
          console.log(error);
        }
      } else if (menu == "receipt") {
        const rentingTransaction = {
          boxid: this.getSelectedBox[0].id,
          passcode: this.passcode,
          faceid: this.getFaceID,
          phonenumber: this.phonenumber,
          branchid: configvars.branchid()
        }
        try {
          const renting = await http.renting(rentingTransaction)
          console.log(renting)
        } catch (error) {
          console.log(error)
        }
      }
    },
    updateBoxs: async function(updated) {
      if (updated == true && this.isOpen == false) {

      } else if (updated == true && this.isOpen == true) {

      } else if (updated == true && this.isOpen == true && this.passcodeAttemp == 3) {
        
      }
    },
    passcodeAttemp: async function(updated) {
      if (updated == 3) {
        this.setMenu("hello");
        this.setUpdateTransactions(true);
        this.clearAttemp();
      }
    },
    isOpen: async function(updated) {
      console.log(updated);
    },
    openBox: function(state) {
      if (state == "OPEN") {
        console.log("BOX OPENED")
        ble.openBox()
        setTimeout(() => {
          console.log("BOX CLOESE")
          ble.closeBox()
          this.setBoxState("CLOSE")
        }, 5000)
      }
    }
  }
}
</script>