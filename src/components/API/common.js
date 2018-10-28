import ConfigVars from '../../const/configvars'
import axios from "axios"

export default {
    aviableboxes: async () => {
        const boxes = await axios.post(ConfigVars.API_URL + 'getaviableboxes', { branchid: ConfigVars.branchid() })
        return boxes
    },
    inuseboxes: async () => {
        const boxes = await axios.post(ConfigVars.API_URL + 'getinuseboxes', { branchid: ConfigVars.branchid() })
        return boxes
    },
    getallboxes: async () => {
        const boxes = await axios.post(ConfigVars.API_URL() + 'getallboxes', { branchid: ConfigVars.branchid() })
        return boxes
    },
    deletetransaction: async (transactionid) => {
        const id = transactionid
        const checkout = await axios.post(ConfigVars.API_URL + 'checkout', { transactionid: id })
        return checkout
    },
    renting: async (obj) => {
        const renting = await axios.post(ConfigVars.API_URL() + 'renting', obj)
        return renting
    }
}