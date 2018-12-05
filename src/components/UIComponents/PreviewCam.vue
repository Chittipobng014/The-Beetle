<template>
    <div>
      <v-dialog
            v-model="facefail"
            width="500"
            >
                <v-card>
                    <v-card-title
                    class="headline grey lighten-2 center"
                    primary-title
                    >
                        No face deteced!!
                    </v-card-title>

                    <v-card-text class="center">
                        Please use passcode
                    </v-card-text>
                </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ble from "../ble/ble";
import vuex from "../../const/vuex";
import http from "../API/common";
import faceAPI from "../API/faceAPI";

export default {
  name: "faceReg",
  data() {
    return {
      alert: false,
      facefail: false
    };
  },
  methods: {
    ...mapActions(vuex.setters),
    uploadPhoto: async function(imageURI) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(`uploading`);
          var base64str = imageURI.toString();
          var binary = atob(base64str.replace(/\s/g, ""));
          var len = binary.length;
          var buffer = new ArrayBuffer(len);
          var view = new Uint8Array(buffer);
          for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
          }
          var blob = new Blob([view], { type: "image/jpeg" });
          var timestamp = Number(new Date());
          var photoRef = this.$storage.child("photos/" + timestamp + ".jpeg");
          const upload = await photoRef.put(blob);
          const photoUrl = await photoRef.getDownloadURL();
          resolve(photoUrl);
        } catch (error) {
          reject(error);
          console.log(`Upload Error ${error}`);
        }
      });
    },
    openWithFace: async function(faceID) {
      try {
        let facesid = await http.getFaceid(1);
        let facesRes = facesid.data.facesid;
        if (facesRes.length == 0) {
          this.noFaceMatch();
        } else {
          let faces = [];
          facesRes.forEach(e => {
            faces.push(e.faceid);
          });
          faces.push(faceID);

          const verify = await faceAPI.verify(faces);

          if (verify.data.groups[0].length < 2) {
            this.noFaceMatch(); //-------------------------------------
            //---------------------------------------------------------------------------------------------------------------
          } else if (verify.data.groups[0].length == 2) {
            const faceIdOfBox = verify.data.groups[0].filter(e => {
              return e != faceID;
            });

            const boxIdFromFaceId = facesRes.filter(e => {
              return e.faceid == faceIdOfBox;
            });
            const boxid = boxIdFromFaceId[0].boxid;
            const transactionid = boxIdFromFaceId[0].id;
            const peripheral = await ble.bleConnect(boxid);
            this.setPeripheral(peripheral);
            this.setBoxState("OPEN");
            this.setUpdateBoxs(true);
            this.hideLoading();
            this.hide();
            this.showThanksAlert();
            const checkout = await http.checkout(transactionid);
            this.openSuccess();
          } else if (verify.data.groups[0].length > 2) {
            const faceIdOfBox = verify.data.groups[0].filter(e => {
              return e != faceID;
            });

            const boxIdFromFaceId = facesRes.filter(e => {
              const faceid = faceIdOfBox.filter(f => {
                return f == e.faceid;
              });
              return e.faceid == faceid;
            });

            let boxid = [];
            boxIdFromFaceId.forEach(id => {
              boxid.push(id);
            });

            this.setBoxes(boxid);
            let setState = await this.selectOpenBoxes(true);
            if (setState) {
              this.setMenu("list");
              this.setStep("1");
            }
          }
        }
      } catch (error) {
        this.noFaceMatch();
        console.log(`Open With Face Error `);
        console.log(`${error}`);
      }
    },
    getFaceIDFromAPI: async function(photoUrl) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log(`getting face id`);
          var faceId = await faceAPI.detection(photoUrl);
          if (faceId == false) {
            resolve(false);
          } else {
            resolve(faceId);
          }
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });
    },
    saveFaceID: async function(faceID) {
      console.log(`face id saved`);
      this.hideLoading();
      this.setFaceID(faceID);
      this.setMenu("passcode");
      this.setStep("4");
    },
    startCameraAbove: function() {
      CameraPreview.startCamera({
        x: 0,
        y: 0,
        width: screen.height,
        height: screen.width,
        toBack: false,
        previewDrag: false,
        tapPhoto: false
      });
    },
    startCameraBelow: function() {
      CameraPreview.startCamera({
        x: 50,
        y: 50,
        width: 300,
        height: 300,
        camera: "front",
        tapPhoto: true,
        previewDrag: false,
        toBack: true
      });
    },
    stopCamera: function() {
      CameraPreview.stopCamera();
    },
    takePicture: function() {
      CameraPreview.takePicture(async imageURI => {
        try {
          this.hide();
          this.showLoading();
          console.log(`start upload`);
          const photoUrl = await this.uploadPhoto(imageURI);
          const faceID = await this.getFaceIDFromAPI(photoUrl);
          if (faceID == false) {
            this.setMenu("hello");
          }
          if (this.isOpen == true) {
            this.openWithFace(faceID);
          } else {
            if (faceID == null) {
              // show alert message and instruction
              // retake picture
            } else {
              this.saveFaceID(faceID);
            }
          }
        } catch (error) {
          console.log(`take picture error ${error}`);
          this.setMenu("hello");
          this.setIsOpen(false);
        }
      });
    },
    show: function() {
      CameraPreview.show();
    },
    hide: function() {
      CameraPreview.hide();
    },
    openSuccess: function() {
      setTimeout(() => {
        this.setIsOpen(false);
        this.hideThanksAlert();
        this.setMenu("hello");
      }, 2000);
    },
    noFaceMatch: function() {
      this.facefail = true;
      setTimeout(() => {
        this.setOpenByPasscode(true);
        this.facefail = false;
        this.setMenu("phoneask");
        this.setStep("1");
      }, 3000);
    }
  },
  computed: {
    ...mapGetters(vuex.getters)
  },
  mounted() {
    this.show();
    this.startCameraAbove();
    setTimeout(() => {
      this.takePicture();
    }, 5000);
  }
};
</script>

<style scoped>
</style>
