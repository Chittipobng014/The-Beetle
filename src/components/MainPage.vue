<template>
    <v-app class="fullscreen fontcolor">
        <v-layout row wrap class="background-img"> 
            <v-flex xs4 style="padding: 0px; padding-top: 0px; padding-left: 0px;  border-shadow: 0px">
                <div style="max-height: 100vh;  min-height: 100vh;   border: 0px" id="scroll-target">
                    <v-card class="sidebar">  
                        <div class="sidebarheader">
                            <div style="margin-top: 4%">
                                <img class="sidebar-logo" src="../assets/Logo/logo.png">
                            </div>
                            <div class="sidebar-text">
                                SMART MOBILE LOCKER
                            </div>
                        </div>
                        <div class="sidebartitle center">Instruction</div>
                        <div class="content-container">
                            <div class="sidebarcontent sidebarcontentText">
                              <transition name="slide-y-transition">
                                <div v-if="isMenu == 'hello'" >
                                  <div class="inActive">1. Select Menu</div>
                                </div>
                              </transition>
                              <transition name="fade">  
                                <div v-if="isMenu == 'list' || isMenu == 'renting' || isMenu == 'faceReg' || isMenu == 'passcode' || isMenu == 'repasscode' || isMenu == 'receipt' || isMenu == 'checkpasscode'" ref="boxview" >
                                  <renting-step></renting-step>
                                </div>             
                              </transition>                                             
                            </div>
                        </div>                            
                    </v-card>
                </div>
            </v-flex>
            <v-flex xs8 style="padding: 0px;   padding-left: 0px;  padding-top: 0px">
                <div class="navbar">
                  <v-layout row wrap>
                    <v-flex xs2>
                      <div style="min-height: 14vh; max-height: 14vh;" class="h-center">
                        <img src="../assets/beetle.png" alt="" class="navBeetle">
                      </div>
                    </v-flex>
                    <v-flex xs10>
                      <div class="h-center" style="min-height: 14vh; max-height: 14vh; padding: 4% 4% 4% 0%;">
                        <div v-if="isMenu == 'hello'" class="navHeader h-center">
                          Welcome
                        </div>
                        <div v-if="isMenu == 'list' || isMenu == 'renting' || isMenu == 'faceReg' || isMenu == 'passcode' || isMenu == 'repasscode' || isMenu == 'receipt' || isMenu == 'checkpasscode' && isOpen == false" class="navHeader h-center">
                          <transition name='fade'>
                          <div v-if="isStep == 1">Select a Beetle box</div>
                          <div v-else-if="isStep == 2">Comfirm renting</div>
                          <div v-else-if="isStep == 3">Face Recognitio</div>
                          <div v-else-if="isStep == 4">Set passcode</div>
                          <div v-else-if="isStep == 5">Confirm passcode</div>
                          <div v-else-if="isStep == 6">Success</div>
                          </transition>
                        </div>
                      </div>
                    </v-flex>
                  </v-layout>                  
                </div>
                <div class="content">
                  <transition name="fade">
                    <component v-bind:is="isMenu"></component>
                  </transition>
                </div>                    
            </v-flex>
        </v-layout> 
        <v-dialog
          v-model="dialog"
          persistent
          width="300"
          lazy
        >
          <v-card
            color="indigo"
            dark
          >
            <v-card-text>
              Loading...
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
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
      <watcher></watcher>
    </v-app>
</template>

<script>
import OutlineLabel from "./OutlineLabel";
import { mapGetters, mapActions } from "vuex";
import vuex from "../const/vuex"
import { Menu, BoxList, BoxRenting, Receipt } from "./index.js";
import { RentingStep, PreviewCam, PasscodePad } from "./UIComponents/index.js";
import watcher from "./customizes/watcher";

export default {
  name: "mainpage",
  components: {
    hello: Menu,
    renting: BoxRenting,
    list: BoxList,
    RentingStep,
    OutlineLabel,
    faceReg: PreviewCam,
    passcode: PasscodePad,
    repasscode: PasscodePad,
    checkpasscode: PasscodePad,
    receipt: Receipt,
    watcher
  },
  data() {
    return {
      dialog: false,
      boxs: [],
      alert: false
    };
  },
  watch: {
    startApp: function(state) {
      if (state == true) {
        setTimeout(() => {
          this.dialog = false;
        }, 500);
      }
    }
  },
  computed: {
    ...mapGetters(vuex.getters)
  },
  methods: {
    ...mapActions(vuex.setters)
  },
  async beforeMount() {
    try {
      this.dialog = true;
      this.setBoxes();
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 1366.4px) {
  .sidebar-text {
    font-size: 200%;
  }

  .sidebartitle {
    min-height: 10vh;
    max-height: 10vh;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 330%;
    color: #ffffff;
  }

  .sidebarcontentText {
    font-size: 200%;
  }

  .navHeader {
    background-color: #ffffff;
    min-height: 9vh;
    max-height: 9vh;
    max-width: 100%;
    min-width: 100%;
    border-radius: 5px;
    font-size: 270%;
  }
}

@media only screen and (max-width: 1024px) {
  .sidebar-text {
    font-size: 150%;
  }

  .sidebartitle {
    min-height: 10vh;
    max-height: 10vh;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 250%;
    color: #ffffff;
  }

  .sidebarcontentText {
    font-size: 150%;
  }

  .navHeader {
    background-color: #ffffff;
    min-height: 9vh;
    max-height: 9vh;
    max-width: 100%;
    min-width: 100%;
    border-radius: 5px;
    font-size: 220%;
    color: #3b5998;
  }
}

.fullscreen {
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: hidden;
}

.sidebar-logo {
  height: 12vh;
  width: 8vw;
}

.background-img {
  background-color: #e8e8e8;
}

.sidebarheader {
  min-height: 14vh;
  max-height: 14vh;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar {
  max-height: 99vh;
  min-height: 100vh;
  border: 0px;
  background-color: #3b5998;
}

.navbar {
  min-height: 14vh;
  background-color: #3b5998;
}

.content-container {
  height: 76vh;
  padding: 0% 5% 5% 5%;
}

.sidebarcontent {
  background-color: #eae4e4;
  min-height: 74vh;
  padding: 8% 8% 8% 8%;
  position: relative;
}

.navBeetle {
  width: 7vw;
  height: 10vh;
}
</style>

<style>
.center {
  text-align: center;
}

.content {
  min-height: 86vh;
}

.h-center {
  justify-content: center;
  align-items: center;
  display: flex;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.inActive {
  background-color: rgba(251, 246, 46, 0.28);
}
</style>
