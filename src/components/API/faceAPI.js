import axios from "axios"

export default {
    verify: async faces => {
        let faceVerify = {
            url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/group",
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": "9b262b7105ad4015b32910e4070274a9"
            },
            data: {
                faceIds: faces
            }
        }
        const result = await axios(faceVerify)
        return result
    },
    detection: async photoUrl => {
        var facedetect = {
            url:
                "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
            data: {
                url: photoUrl
            },
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": "9b262b7105ad4015b32910e4070274a9"
            }
        }
        const result = await axios(facedetect)
        if (result.data.length == 0) {
            return false
        } else {
            const faceid = result.data[0].faceId
            return faceid
        }
    }
}