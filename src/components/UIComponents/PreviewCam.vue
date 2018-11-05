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
      <v-dialog
          v-model="loading"
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
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ble from '../ble/ble'
import vuex from '../../const/vuex'
import http from '../API/common'
import faceAPI from '../API/faceAPI'

export default {
  name: "faceReg",
  data() {
    return {
      alert: false,
      loading: false,
      facefail: false
    };
  },
  methods: {
    ...mapActions(vuex.setters),
    uploadPhoto: async function(imageURI) {
      return new Promise(async () => {
        try {
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
          resolve(photoUrl)
        } catch (error) {
          reject(error)
          console.log(error)
        }
      })
    },
    openWithFace: async function(faceID) {
      try {
        let facesid = await http.getFaceid(1)
        let facesRes = facesid.data.facesid
        let faces = []
        facesRes.forEach(e => {
          faces.push(e.faceid)
        })
        faces.push(faceID)
        
        const verify = await faceAPI.verify(faces);
        if (verify.data.groups[0].length < 2) { // no face match
          this.noFaceMatch()
        } else if (verify.data.groups[0].length == 2) {
          const faceIdOfBox = verify.data.groups[0].filter(e => {
            return e != faceId
          })
          const transactionid = boxIdFromFaceId[0].id
          const peripheral = await ble.bleConnect(boxid)
          this.setPeripheral(peripheral)
          this.setBoxState("OPEN")
          this.setUpdateBoxs(true);
          this.loading = false;
          this.hide();
          this.alert = true;
          const checkout = await http.checkout(transactionid)
          this.openSuccess()
        } else if (verify.data.groups[0].length > 2) {
          //go select box
        }
      } catch (error) {
        console.log(error)
      }
    },
    getFaceID: async function(photoUrl) {
      return new Promise(async () => {
        try {
          var faceId = await faceAPI.detection(photoUrl)
          resolve(faceId)
        } catch (error) {
          reject(error)
          console.log(error)
        }
      })
    },
    setFaceID: async function(faceID) {
      this.loading = false;
      this.setFaceID(faceID);
      this.setMenu("passcode");
      this.setStep("4");
    },
    startCameraAbove: function() {
      CameraPreview.startCamera({
        x: 50,
        y: 50,
        width: 819,
        height: 614,
        toBack: false,
        previewDrag: false,
        tapPhoto: true
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
        this.loading = true;
        const photoUrl = await uploadPhoto(imageURI);
        const faceID = await this.getFaceID(photoUrl) 
        if (this.isOpen == true) {
          this.openWithFace(faceID)
        } else {
          if (faceID == null) {
              // show alert message and instruction
              // retake picture
          } else {
            this.setFaceID(faceID)
          }
        }  
        } catch (error) {
          console.log(error)
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
      setTimeout( () => {
        this.isOpen = false
        this.alert = false;
        this.setMenu("hello");
      }, 2000)
    },
    noFaceMatch: function() {
      this.facefail = true;
        setTimeout(() => {
          this.facefail = false;
          this.setMenu("passcode");
      }, 3000)
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
    }, 3000);
    // this.setMenu("passcode");
    // this.setStep("4");
  }
};
</script>

<style scoped>
</style>
