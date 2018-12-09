<template>
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <p>Please takeoff of the eyeware and stare at the screen</p>
      <p>We will take the picture in {{time}}</p>
    </div>
  </div>
</template>

<script>
//var modal = document.getElementById("myModal")

import { mapActions, mapGetters } from "vuex";
import ble from "../ble/ble";
import vuex from "../../const/vuex";
import http from "../API/common";
import faceAPI from "../API/faceAPI";

export default {
  name: "faceReg",
  data() {
    return {
      facefail: false,
      time: 10,
      modal: null
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
      
      // this.setPasscode("000000");
      // this.setRepasscode("000000");
      // this.setMenu("checkpasscode");
      // this.setStep("4");

      this.setMenu("passcode");
      this.setStep("4");
    },
    startCameraAbove: function() {
      CameraPreview.startCamera({
        x: 105,
        y: 130,
        width: screen.height * 0.8,
        height: screen.width * 0.8,
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
      this.showInstructionModal()
      CameraPreview.show();
      this.countdown();
    },
    hide: function() {
      CameraPreview.hide();
      this.hideInstructionModal();
      this.stopCamera();
    },
    openSuccess: function() {
      setTimeout(() => {
        this.setIsOpen(false);
        this.hideThanksAlert();
        this.setMenu("hello");
      }, 2000);
    },
    noFaceMatch: function() {
      this.showFaceFail();
      setTimeout(() => {
        this.setOpenByPasscode(true);
        this.hideFaceFail();
        this.setMenu("phoneask");
        this.setStep("1");
      }, 3000);
    },
    countdown: function() {
      let timer = setInterval(() => {
        this.time -= 1;
        if (this.time == 0) {
          this.takePicture();
          clearInterval(timer);
        }
      }, 1000);
    },
    showInstructionModal: function() {
      this.modal.style.display = "block";
    },
    hideInstructionModal: function() {
      this.modal.style.display = "none";
    }
  },
  computed: {
    ...mapGetters(vuex.getters)
  },
  mounted() {
    this.modal = document.getElementById("myModal");
    this.show();
    this.startCameraAbove();
  }
};
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.8);
}

/* Modal Content/Box */
.modal-content {
  background-color: rgba(0, 0, 0, 0);
  margin: 0% auto;
  padding: 10px;
  width: 95%;
  text-align: center;
  color: aliceblue;
  font-size: 250%;
}
</style>
