import Vue from 'vue'
import Vuex from 'vuex'
import http from './components/API/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: { menu: "hello", step: "", isOpen: false, data: {passcode: '', repasscode: ''} },
    selectedBox: [],
    peripheral: null,
    faceID: null,
    tel: null,
    boxes: [],
    transactions: [],
    updateBoxs: false,
    updateTransactions: false,
    passcodeAttemp: 0,
    startApp: null,
    phonenumber: '',
    openBox: 'CLOSE'
  },
  getters: {
    startApp: state => state.startApp,
    isMenu: state => state.status.menu,
    isStep: state => state.status.step,
    isOpen: state => state.status.isOpen,
    getData: state => state.status.data,
    passcode: state => state.status.data.passcode,
    repasscode: state => state.status.data.repasscode,
    getSelectedBox: state => state.selectedBox,
    getPeripheral: state => state.peripheral,
    getFaceID: state => state.faceID,
    getTel: state => state.tel,
    getBoxes: state => state.boxes,
    getTransactions: state => state.transactions,
    updateBoxs: state => state.updateBoxs,
    updateTransactions: state => state.updateTransactions,
    passcodeAttemp: state => state.passcodeAttemp,
    phonenumber: state => state.phonenumber,
    openBox: state => state.openBox
  },
  mutations: {
    SET_PHONENUMBER(state, payload){
      state.phonenumber = payload
    },
    START_APP(state, payload){
      state.startApp = payload
    },
    CLEAR_ATTEMP(state){
      state.passcodeAttemp = 0;
    },
    INCREASE_ATTEMP(state){
      state.passcodeAttemp++
    },
    SET_UPDATEBOXS(state, payload){
      state.updateBoxs = payload;
    },
    SET_UPDATETRANSACTIONS(state, payload){
      state.updateTransactions = payload;
    },
    CLEAR_DETAILS(state){
      state.status.data.passcode = '';
      state.status.data.repasscode = '';
      state.peripheral = null;
      state.faceID = null;
      state.tel = null;
      state.selectedBox = [];
    },
    SET_BOXES(state, payload){
      state.boxes = payload
    },
    SET_TEL(state, payload){
      state.tel = payload;
    },
    SET_FACEID(state, payload){
      state.faceID = payload;
    },
    SET_PERIPHERAL(state, payload){
      state.peripheral = payload;
    },
    CLEAR_PERIPHERAL(state){
      state.peripheral = [];
    },
    ADDSELECTED_BOX(state, payload){
      state.selectedBox.push(payload)
    },
    CLEAR_SELECTEDBOX(state){
      state.selectedBox = [];
    },
    boxview(state, payload) {
      state.boxview = payload;
    },
    menu(state, payload) {
      state.menu = payload;
    },
    SET_MENU(state, payload) {
      state.status.menu = payload;
    },
    SET_STEP(state, payload) {
      state.status.step = payload;
    },
    SET_DATA(state, payload) {
      state.status.data = payload;
    },
    SET_PASSCODE(state, payload) {
      state.status.data.passcode = payload;
    },
    SET_REPASSCODE(state, payload) {
      state.status.data.repasscode = payload;
    },
    SET_ISOPEN(state, payload){
      state.status.isOpen = payload;
    },
    SET_TRANSACTIONS(state, payload){
      state.transactions = payload;
    },
    CHANGE_BOX_STATE(state, payload){
      state.openBox = payload
    }
  },
  actions: {
    setUpdateBoxs: ({ commit }, payload) => commit("SET_UPDATEBOXS", payload),
    setUpdateTransactions: ({ commit }, payload) => commit("SET_UPDATETRANSACTIONS", payload),
    clearDetails: ( {commit} ) => commit("CLEAR_DETAILS"),
    setMenu: ({ commit }, payload) => commit("SET_MENU", payload),
    setStep: ({ commit }, payload) => commit("SET_STEP", payload),
    setData: ({ commit }, payload) => commit("SET_DATA", payload),
    setPasscode: ({ commit }, payload) => commit("SET_PASSCODE", payload),
    setRepasscode: ({ commit }, payload) => commit("SET_REPASSCODE", payload),
    setSelectedBox: ({ commit }, payload) => {
      commit("ADDSELECTED_BOX", payload)
    },
    setPeripheral: ({ commit }, payload) => commit("SET_PERIPHERAL", payload),
    clearPeripheral: ({ commit }, payload) => commit("CLEAR_PERIPHERAL"),
    setFaceID: ({ commit }, payload) => commit("SET_FACEID", payload),
    setTel: ({ commit }, payload) => commit("SET_TEL", payload),
    setBoxes: async ({ commit }) => {
      try {
        commit("START_APP", false)
        const boxes = await http.getallboxes()
        commit("START_APP", true)
        commit("SET_BOXES", boxes.data.boxes);
      } catch (error) {
        console.log(error)
        commit("START_APP", false)
      }
    },
    setIsOpen: ( {commit }, payload) => commit("SET_ISOPEN", payload),
    clearSelectedBox: ({commit }) => commit("CLEAR_SELECTEDBOX"),
    setTransactions: ({commit }, payload) => commit("SET_TRANSACTIONS", payload),
    passcodeAttempInc: ({ commit }) => commit("INCREASE_ATTEMP"),
    clearAttemp: ({ commit }) => commit("CLEAR_ATTEMP"),
    appStart: ({ commit }) => commit("START_APP", payload),
    setPhonenumber: ({ commit }, payload) => commit("SET_PHONENUMBER", payload),
    setBoxState: ({ commit }, payload) => commit("CHANGE_BOX_STATE", payload)
  }
})
