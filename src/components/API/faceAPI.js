import axios from "axios"

export default {
    verify: async faces => {
        let faceVerify = {
            url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/group",
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": "863c391b338e49e7995d2fdeb9a4477c"
            },
            data: {
                faceIds: faces
            }
        }
        const result = await axios(faceVerify)
        return result
    },
    detection: async url => {
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
        }
        const result = await axios(facedetect)
        const faceid = result.data[0].faceId
        return faceid
    }
}