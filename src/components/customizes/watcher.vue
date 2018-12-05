<template></template>

<script>
import vuex from "../../const/vuex";
import configvars from "../../const/configvars";
import { mapGetters, mapActions } from "vuex";
import ble from "../ble/ble";
import http from "../API/common";

export default {
  computed: {
    ...mapGetters(vuex.getters)
  },
  methods: {
    ...mapActions(vuex.setters),
    checkPasscode: async function() {
      //check passcode
      if (this.repasscode != "" && this.passcode != "") {
        this.dialog = true;
        if (this.repasscode == this.passcode) {
          // passcode match
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
    openWithPasscode: async function() {
      try {
        this.showLoading();
        const boxid = this.getSelectedBox[0].id;
        const result = await http.passcodeVerify(this.passcode, boxid);
        if (result.data.result == false) {
          console.log("passcode fail");
        } else {
          const peripheral = await ble.bleConnect(boxid);
          this.setPeripheral(peripheral);
          this.setBoxState("OPEN");
          await this.selectOpenBoxes(false);
          this.setOpenByPasscode(false);
          this.hideLoading();
          this.setIsOpen(false);
          this.showThanksAlert();
          setTimeout(() => {
            this.hideThanksAlert();
            this.setMenu("hello");
          }, 2000);
        }
      } catch (error) {
        console.log(`error passcode ${error}`);
        this.setMenu("hello");
        this.setStep("1");
        this.setIsOpen(false);
        this.setOpenByPasscode(false);
      }
    },
    renting: async function() {
      const rentingTransaction = {
        boxid: this.getSelectedBox[0].id,
        passcode: this.passcode,
        faceid: this.getFaceID,
        phonenumber: this.phonenumber,
        branchid: configvars.branchid()
      };
      try {
        const renting = await http.renting(rentingTransaction);
      } catch (error) {
        console.log(error);
      }
    },
    connectToBox: async function() {
      try {
        const connect = await ble.bleConnect(this.getSelectedBox[0].id);
        this.setPeripheral(connect);
      } catch (error) {
        console.log(error);
      }
    },
    tempOpenBox: async function() {
      try {
        let open = await ble.openBox(this.getPeripheral);
        setTimeout(async () => {
          let close = await ble.closeBox(this.getPeripheral);
          this.setBoxState("CLOSE");
        }, 5000);
      } catch (error) {}
    },
    lockBox: async function() {
      this.setMenu("hello");
      this.setUpdateTransactions(true);
      this.clearAttemp();
    }
  },
  watch: {
    isMenu: async function(menu) {
      console.log("​menu", menu);
      if (menu == "checkpasscode") {
        this.checkPasscode();
      } else if (
        menu == "openByPasscode" &&
        this.isOpen == true &&
        this.openByPasscode == true
      ) {
        this.openWithPasscode();
      } else if (menu == "renting") {
        this.connectToBox();
      } else if (menu == "receipt") {
        this.renting();
      }
    },
    passcodeAttemp: async function(updated) {
      if (updated == 3) {
        this.lockBox();
      }
    },
    openBox: async function(state) {
      if (state == "OPEN") {
        this.tempOpenBox();
      } else if (state == "CLOSE") {
        await ble.bleDisconnect(this.getSelectedBox[0].id);
        this.clearDetails();
        this.clearPeripheral();
      }
    },
    openByPasscode: function(passcode) {
    }
  }
};
</script>