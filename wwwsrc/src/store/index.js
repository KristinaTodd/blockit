import Vue from "vue";
import Vuex, { Store } from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "https://localhost:5001/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    publicKeeps: [],
    myVaults: [],
    myKeeps: [],
    myVaultKeeps: [],
    activeKeep: {},
    activeVault: {}
  },
  mutations: {
    setPublicKeeps(state, keeps) {
      state.publicKeeps = keeps;
    },
    setMyVaults(state, data) {
      state.myVaults = data;
    },
    setMyKeeps(state, data) {
      state.myKeeps = data;
    },
    setMyVaultKeeps(state, data) {
      state.myVaultKeeps = data;
    },
    setActiveKeep(state, data) {
      state.activeKeep = data;
    },
    setActiveVault(state, data) {
      state.activeVault = data;
    },
    deleteKeep(state, data) {
      state.publicKeeps = state.publicKeeps.filter(k => k.id != data.id)
    },
    deleteVault(state, data) {
      state.myVaults = state.myVaults.filter(v => v.id != data.id)
    },
    removeVaultKeep(state, data) {
      state.myVaultKeeps = state.myVaultKeeps.filter(v => v.id != data.id)
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getKeeps({ commit, dispatch }) {
      let res = await api.get("keeps");
      commit("setPublicKeeps", res.data);
    },
    async getKeepById({ commit, dispatch }, keep) {
      let res = await api.get(keep.id)
      commit("setActiveKeep", res.data)
    },
    async getMyStuff({ commit, dispatch }) {
      let res1 = await api.get("vaults/myvaults")
      commit("setMyVaults", res1.data);
      let res2 = await api.get("keeps/mykeeps")
      commit("setMyKeeps", res2.data);
    },
    async getKeepsByVaultId({ commit, dispatch }, payload) {
      let res = await api.get("vaults/" + payload.id + "/keeps")
    },
    async createKeeps({ commit, dispatch }, payload) {
      let res = await api.post("keeps", payload);
      dispatch("getKeeps");
    },
    async createVault({ commit, dispatch }, payload) {
      let res = await api.post("vaults", payload);
      dispatch("getMyVaults");
    },
    async createVaultKeeps({ commit, dispatch }, payload) {
      let res = await api.post("vaultkeeps", payload);
      commit("setMyVaultKeeps", res.data);
    },
    setActiveKeep({ commit, dispatch }, payload) {
      commit("setActiveKeep", payload)
    },
    setActiveVault({ commit, dispatch }, payload) {
      commit("setActiveVault", payload)
    },
    async updateKeeps({ commit, dispatch }, payload) {
      let res = await api.put("keeps/" + payload.id);
      dispatch("getKeeps");
    },
    async updateCount({ commit, dispatch }, payload) {
      let res = await api.put("keeps/" + payload.id, payload);
      dispatch("setActiveKeep", res.data);
    },
    async deleteKeep({ commit, dispatch }, payload) {
      let res = await api.delete("keeps/" + payload.id)
      commit("deleteKeep", res.data)
    },
    async deleteVault({ commit, dispatch }, payload) {
      let res = await api.delete("vaults/" + payload.id)
      commit("deleteVault", res.data)
    },
    async removeVaultKeep({ commit, dispatch }, payload) {
      let res = await api.delete("vaultkeeps/" + payload.id)
      commit("removeVaultKeep", res.data)
    }

  }
}
);
