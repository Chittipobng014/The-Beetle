import Vue from 'vue'
import Vuex from 'vuex'
import http from './components/API/common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: { menu: "hello", step: "", isOpen: false, data: { passcode: '', repasscode: '' } },
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
    openBox: 'CLOSE',
    openSelection: false,
    loading: true,
    thanksAlert: false,
    openByPasscode: false
  },
  getters: {
    openByPasscode: state => state.openByPasscode,
    thanksAlert: state => state.thanksAlert,
    loading: state => state.loading,
    openSelection: state => state.openSelection,
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
    SET_OPENPASSCODE(state, payload) {
      state.openByPasscode = payload
    },
    SET_THANKSALERT(state, payload) {
      state.thanksAlert = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_OPENSELECTION(state, payload) {
      state.openSelection = payload
    },
    SET_PHONENUMBER(state, payload) {
      state.phonenumber = payload
    },
    START_APP(state, payload) {
      state.startApp = payload
    },
    CLEAR_ATTEMP(state) {
      state.passcodeAttemp = 0;
    },
    INCREASE_ATTEMP(state) {
      state.passcodeAttemp++
    },
    SET_UPDATEBOXS(state, payload) {
      state.updateBoxs = payload;
    },
    SET_UPDATETRANSACTIONS(state, payload) {
      state.updateTransactions = payload;
    },
    CLEAR_DETAILS(state) {
      state.status.data.passcode = '';
      state.status.data.repasscode = '';
      state.peripheral = null;
      state.faceID = null;
      state.tel = null;
      state.selectedBox = [];
    },
    SET_BOXES(state, payload) {
      state.boxes = payload
    },
    SET_TEL(state, payload) {
      state.tel = payload;
    },
    SET_FACEID(state, payload) {
      state.faceID = payload;
    },
    SET_PERIPHERAL(state, payload) {
      state.peripheral = payload;
    },
    CLEAR_PERIPHERAL(state) {
      state.peripheral = null;
    },
    ADDSELECTED_BOX(state, payload) {
      state.selectedBox.push(payload)
    },
    CLEAR_SELECTEDBOX(state) {
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
    SET_ISOPEN(state, payload) {
      state.status.isOpen = payload;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
    CHANGE_BOX_STATE(state, payload) {
      state.openBox = payload
    }
  },
  actions: {
    setUpdateBoxs: ({ commit }, payload) => commit("SET_UPDATEBOXS", payload),
    setUpdateTransactions: ({ commit }, payload) => commit("SET_UPDATETRANSACTIONS", payload),
    clearDetails: ({ commit }) => commit("CLEAR_DETAILS"),
    setMenu: ({ commit }, payload) => commit("SET_MENU", payload),
    setStep: ({ commit }, payload) => commit("SET_STEP", payload),
    setData: ({ commit }, payload) => commit("SET_DATA", payload),
    setPasscode: ({ commit }, payload) => commit("SET_PASSCODE", payload),
    setRepasscode: ({ commit }, payload) => commit("SET_REPASSCODE", payload),
    setSelectedBox: ({ commit }, payload) => {
      commit("ADDSELECTED_BOX", payload)
    },
    setPeripheral: ({ commit }, payload) => commit("SET_PERIPHERAL", payload),
    clearPeripheral: ({ commit }) => {
      commit("CLEAR_PERIPHERAL")
      console.log("Pheriperal was clear")
    },
    setFaceID: ({ commit }, payload) => commit("SET_FACEID", payload),
    setTel: ({ commit }, payload) => commit("SET_TEL", payload),
    setBoxes: async ({ commit, getters }, payload) => {
      try {
        commit("SET_LOADING", true)
        const fetch = await http.getallboxes()
        const boxes = fetch.data.boxes
        if (getters.isOpen == true) {
          let result = boxes.filter((box) => {
            let boxid = payload.filter((id) => {
              if (id.boxid == box.id) {
                console.log(id.boxid)
                return id
              }
            })
            console.log(boxid)
            if (boxid.length == 0) {
              return []
            } else {
              return box.id == boxid[0].boxid
            }
          })
          commit("SET_LOADING", false)
          commit("SET_BOXES", result);
        } else {
          let result = boxes.filter((box) => box.status == 'aviable')
          commit("SET_LOADING", false)
          commit("SET_BOXES", result);
        }

      } catch (error) {
        console.log(error)
        commit("SET_LOADING", true)
      }
    },
    setIsOpen: ({ commit }, payload) => commit("SET_ISOPEN", payload),
    clearSelectedBox: ({ commit }) => commit("CLEAR_SELECTEDBOX"),
    setTransactions: ({ commit }, payload) => commit("SET_TRANSACTIONS", payload),
    passcodeAttempInc: ({ commit }) => commit("INCREASE_ATTEMP"),
    clearAttemp: ({ commit }) => commit("CLEAR_ATTEMP"),
    appStart: ({ commit }) => commit("START_APP", payload),
    setPhonenumber: ({ commit }, payload) => commit("SET_PHONENUMBER", payload),
    setBoxState: ({ commit }, payload) => commit("CHANGE_BOX_STATE", payload),
    selectOpenBoxes: ({ commit }, payload) => {
      return new Promise((resolve, rejects) => {
        try {
          commit("SET_OPENSELECTION", payload)
          resolve(true)
        } catch (error) {
          rejects(error)
        }
      })
    },
    showLoading: ({ commit }) => commit("SET_LOADING", true),
    hideLoading: ({ commit }) => commit("SET_LOADING", false),
    showThanksAlert: ({ commit }) => commit("SET_THANKSALERT", true),
    hideThanksAlert: ({ commit }) => commit("SET_THANKSALERT", false),
    setOpenByPasscode: ({ commit }, payload) => commit("SET_OPENPASSCODE", payload)
  }
})
