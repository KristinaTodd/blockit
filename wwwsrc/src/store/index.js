import Vue from "vue";
import Vuex from "vuex";
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
    async getMyVaults({ commit, dispatch }, profile) {
      let res = await api.get("vaults/user/" + profile.UserId);
      commit("setMyVaults", res.data);
    },
    async getKeepsByVaultId({ commit, dispatch }, payload) {
      let res = await api.get("vaults/" + payload.id + "/keeps")
    },
    async createKeeps({ commit, dispatch }, payload) {
      let res = await api.post("keeps", payload);
      dispatch("getKeeps");
    },
    async createVaults({ commit, dispatch }, payload) {
      let res = await api.post("vaults", payload);
      dispatch("getMyVaults");
    },
    async createVaultKeeps({ commit, dispatch }, payload) {
      let res = await api.post("vaultkeeps", payload);
      commit("setMyVaultKeeps", res.data);
    },
    async updateKeeps({ commit, dispatch }, payload) {
      let res = await api.put("keeps/" + payload.Id);
      dispatch("getKeeps");
    },
    async deleteKeep({ commit, dispatch }, payload) {
      let res = await api.delete("keeps/" + payload.id)
      commit("deleteKeep", res.data)
    },
    async deleteVault({ commit, dispatch }, payload) {
      let res = await api.delete("vaults/", payload.id)
      commit("deleteVault", res.data)
    },
    async removeVaultKeep({ commit, dispatch }, payload) {
      let res = await api.delete("vaultkeeps/", payload.id)
      commit("removeVaultKeep", res.data)
    }

  }
}
);
