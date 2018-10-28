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

export default {
  name: "faceReg",
  data() {
    return {
      faceid: "",
      alert: false,
      loading: false,
      facefail: false
    };
  },
  methods: {
    ...mapActions(["setMenu", "setStep", "setData", "setFaceID", "setIsOpen", "setUpdateBoxs", "setUpdateTransactions"]),
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
        this.hide();
        this.loading = true;
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
          var facedetect = {
            url:
              "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
            data: {
              url: photoUrl
            },
            method: "POST",
            headers: {
              "Ocp-Apim-Subscription-Key": "863c391b338e49e7995d2fdeb9a4477c"
            }
          };

          const face = await this.axios(facedetect);
          var faceId = face.data[0].faceId;
          if (this.isOpen == true) {
            let faceId1 = this.getTransactions[0].faceid;
            let faceId2 = faceId;
            var faceVerify = {
              url:
                "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/verify",
              method: "POST",
              headers: {
                "Ocp-Apim-Subscription-Key": "863c391b338e49e7995d2fdeb9a4477c"
              },
              data: {
                faceId1: faceId1,
                faceId2: faceId2
              }
            };

            try {
              const verify = await this.axios(faceVerify);
              if (verify.data.isIdentical == true) {
                this.setUpdateBoxs(true);
                this.loading = false;
                this.hide();
                this.alert = true;
                setTimeout( () => {
                  //this.alert = false;
                  this.setMenu("hello");
                }, 2000)
              } else {
                this.facefail = true;
                setTimeout(() => {
                  this.facefail = false;
                  this.setMenu("passcode");
                }, 3000)
              }
            } catch (error) {
              console.log(error)
            }
          } else {
            if (faceId != null) {
              this.loading = false;
              this.setFaceID(faceId);
              this.setMenu("passcode");
              this.setStep("4");
            } else {
              // show alert message and instruction
              // retake picture
            }
          }
        } catch (error) {
          console.log("ERROR");
          console.log(error);
        }
      });
    },
    switchCamera: function() {
      CameraPreview.switchCamera();
    },
    show: function() {
      CameraPreview.show();
    },
    hide: function() {
      CameraPreview.hide();
    },
    changeColorEffect: function() {
      var effect = document.getElementById("selectColorEffect").value;
      CameraPreview.setColorEffect(effect);
    },
    changeFlashMode: function() {
      var mode = document.getElementById("selectFlashMode").value;
      CameraPreview.setFlashMode(mode);
    },
    changeZoom: function() {
      var zoom = document.getElementById("zoomSlider").value;
      document.getElementById("zoomValue").innerHTML = zoom;
      CameraPreview.setZoom(zoom);
    },
    changePreviewSize: function() {
      window.smallPreview = !window.smallPreview;
      if (window.smallPreview) {
        CameraPreview.setPreviewSize({ width: 100, height: 100 });
      } else {
        CameraPreview.setPreviewSize({
          width: window.screen.width,
          height: window.screen.height
        });
      }
    },
    showSupportedPictureSizes: function() {
      CameraPreview.getSupportedPictureSizes(function(dimensions) {
        dimensions.forEach(function(dimension) {
          console.log(dimension.width + "x" + dimension.height);
        });
      });
    }
  },
  computed: {
    ...mapGetters(["isMenu", "isStep", "getData", "isOpen", "getTransactions"])
  },
  watch:{
    isOpen: function(updated){
      if (updated == false) {
        this.alert = false;
      }
    }
  },
  mounted() {
    // this.show();
    // this.startCameraAbove();
    // setTimeout(() => {
    //   this.takePicture();
    // }, 3000);
    this.setMenu("passcode");
    this.setStep("4");
  }
};
</script>

<style scoped>
</style>
