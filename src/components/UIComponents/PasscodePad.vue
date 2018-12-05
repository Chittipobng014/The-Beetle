<template>
    <div class="container">
        <div class="background">
            <div class="center">
                <v-layout row wrap>
                    <v-flex v-if="code.length == 0" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>                        
                    </v-flex>
                    <v-flex v-if="code.length == 1" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>                        
                    </v-flex>
                    <v-flex v-if="code.length == 2" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>                        
                    </v-flex>
                    <v-flex v-if="code.length == 3" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>                        
                    </v-flex>
                     <v-flex v-if="code.length == 4" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed"></div>
                        <div class="dashed"></div>                        
                    </v-flex>
                    <v-flex v-if="code.length == 5" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed"></div>                        
                    </v-flex>
                    <v-flex v-if="code.length == 6" class="h-center" style="margin-bottom: 15px" xs12>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>
                        <div class="dashed">•</div>                        
                    </v-flex>
                    <v-flex class="flex-padding circle" v-for="i in 9" :key="i" xs4>
                        <div class="circleNo" @click="addCode(i)">
                            {{i}}
                        </div>
                    </v-flex>
                    <v-flex row class="circle">
                        <div class="circleNo" @click="addCode(0)" >
                            0
                        </div>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "passcodepad",
  data: function() {
    return {
      code: []
    };
  },
  methods: {
    ...mapActions(["setMenu", "setStep", "setData", "setPasscode", "setRepasscode", "setIsOpen"]),
    addCode: function(num) {
      this.code.push(num);
    }
  },
  watch: {
    passcode: function(change) {
      if (this.code.length == 6) {
        if (this.isMenu == "passcode" && this.isOpen == false) {
          console.log(`${this.isMenu}`)
          this.setPasscode(this.passcode);
          this.setMenu("repasscode");
          this.setStep("5")
          setTimeout(() => {
            this.code = [];
          }, 500);
        } else if (this.isMenu == "repasscode" && this.isOpen == false) {
          console.log(`${this.isMenu}`)
          this.setRepasscode(this.passcode);
          this.setMenu("checkpasscode");
          setTimeout(() => {
            this.code = [];
          }, 500);
        } else if(this.isMenu == "passcode" && this.isOpen == true && this.openByPasscode == true){
          this.setPasscode(this.passcode);
          this.setMenu("openByPasscode");
          setTimeout(() => {
            this.code = [];
          }, 500);
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      "isMenu",
      "isStep",
      "getData",
      "passcode",
      "repasscode",
      "isOpen",
      "openSelection",
      "openByPasscode"
    ]),
    passcode: function() {
      let passcode = "";
      this.code.forEach(i => {
        passcode += i.toString();
      });
      return passcode;
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
  padding: 10px;
  background-color: #3b5998;
  min-width: 60%;
  max-width: 60%;
  min-height: 65vh;
  max-height: 65vh;
}

.background {
  background-color: azure;
  min-width: 100%;
  max-width: 100%;
  min-height: 63vh;
  max-height: 65vh;
}

.circleNo {
  border: 0px solid black;
  border-radius: 50%;
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 200%;
  margin: 0 auto;
  background-color: #3b5998;
  color: aliceblue;
}

.circle {
  padding: 10px;
}

.dashed {
  font-size: 60px;
  width: 50px;
  height: 75px;
  border-bottom: 1px solid black;
  margin: 8px;
}

.ripple {
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.1s, opacity 1s;
}

.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
</style>
