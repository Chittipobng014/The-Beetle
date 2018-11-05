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
    ...mapActions(vuex.setters),
    checkPasscode: function() {
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
    },
    openWithPasscode: function() {
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
    },
    renting: function() {
      const rentingTransaction = {
        boxid: this.getSelectedBox[0].id,
        passcode: this.passcode,
        faceid: this.getFaceID,
        phonenumber: this.phonenumber,
        branchid: configvars.branchid()
      }
      try {
        const renting = await http.renting(rentingTransaction)
        console.log(renting.data)
      } catch (error) {
        console.log(error)
      }
    },
    connectToBox: function() {
      try {
        const connect = await ble.bleConnect(this.getSelectedBox[0].id);
        this.setPeripheral(connect);
      } catch (error) {
        console.log(error);
      }
    },
    tempOpenBox: function() {
      console.log("BOX OPENED")
      ble.openBox(this.getPeripheral)
      setTimeout(() => {
        console.log("BOX CLOESE")
        ble.closeBox(this.getPeripheral)
        this.setBoxState("CLOSE")
        this.clearDetails()
        this.clearPeripheral()
      }, 5000)
    },
    lockBox: function() { 
      this.setMenu("hello");
      this.setUpdateTransactions(true);
      this.clearAttemp();
    }
  },
  watch: {
    isMenu: async function(menu) {
      console.log(menu)
      if (menu == "checkpasscode") {
        this.checkPasscode()
      } else if (menu == "openByPasscode" && this.isOpen == true) {
        this.openWithPasscode()
      } else if (menu == "renting") {
        this.connectToBox()
      } else if (menu == "receipt") {
        this.renting()
      }
    },
    passcodeAttemp: async function(updated) {
      if (updated == 3) {
        this.lockBox()
      }
    },
    isOpen: async function(updated) {
      console.log(updated);
    },
    openBox: function(state) {
      if (state == "OPEN") {
        this.tempOpenBox()
      }
    },
  }
}
</script>