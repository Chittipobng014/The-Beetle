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
        const boxes = await axios.get(ConfigVars.API_URL() + 'getallboxes/' + 1)
        return boxes
    },
    deletetransaction: async (transactionid) => {
        const checkout = await axios.put(ConfigVars.API_URL() + 'checkout/' + transactionid)
        return checkout
    },
    renting: async (obj) => {
        const renting = await axios.post(ConfigVars.API_URL() + 'transactions', obj)
        return renting
    },
    checkout: async transactionid => {
        const checkout = await axios.put(ConfigVars.API_URL() + 'checkout/' + transactionid)
        return checkout
    },
    getFaceid: async branchid => {
        const faceid = await axios.get(ConfigVars.API_URL() + 'transactions/' + branchid)
        return faceid
    },
    passcodeVerify: async (passcode, boxid) => {
        const data = {
            passcode,
            boxid
        }
        const result = await axios.post(ConfigVars.API_URL() + 'passcode', data)
        return result
    },
    checkoutByBoxid: async boxid => {
        const result = await axios.put(ConfigVars.API_URL() + 'checkoutbyid/' + boxid)
        return result
    },
    gettransactionByphone: async phonenumber => {
        const result = await axios.get(ConfigVars.API_URL() + 'transactionsbyphone/' + phonenumber)
        return result
    }
}