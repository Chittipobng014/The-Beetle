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
        const checkout = await axios.put(ConfigVars.API_URL + 'checkout/' + transactionid)
        return checkout
    },
    renting: async (obj) => {
        const renting = await axios.post(ConfigVars.API_URL() + 'transactions', obj)
        return renting
    },
    checkout: async transactionid => {
        const checkout = await axios.post('https://beetle-backend.herokuapp.com/api/checkout', {transactionid, boxid})
        return checkout
    },
    getFaceid: async branchid => {
        const faceid = await axios.post('https://beetle-backend.herokuapp.com/api/transactions/' + branchid)
        return faceid
    }
}