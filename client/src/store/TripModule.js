import Axios from "axios";

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    async getAllTrips({ commit, dispatch }) {
      let res = await api.get("trips");
      commit("setAllTrips", res.data);
    },
    async createTrip({ commit, dispatch }, trip) {
      let res = await api.post("trips", trip);
      commit("addTrip", res.data);
    },

    async getTripById({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId);
      commit("setActiveTrip", res.data);
    }
  }
};