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
    profile: {},
    publicKeeps: [],
    myVaults: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPublicKeeps(state, keeps) {
      state.publicKeeps = keeps;
    },
    setMyVaults(state, data) {
      state.myVaults = data;
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setProfile", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    async getKeeps({ commit, dispatch }) {
      let res = await api.get("keeps");
      commit("setPublicKeeps", res.data);
    },
    async getMyVaults({ commit, dispatch }, profile) {
      let res = await api.get("vaults/user/" + profile.UserId);
      commit("setMyVaults", res.data);
    },

  }
}
);
