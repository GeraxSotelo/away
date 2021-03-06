import Axios from "axios";

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "//awayapp.herokuapp.com/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    async getAllTrips({ commit, dispatch }) {
      let res = await api.get("trips");
      commit("setResource", { resource: "trips", data: res.data });
    },
    async createTrip({ commit, dispatch }, trip) {
      await api.post("trips", trip);
      dispatch("getAllTrips");
    },
    async getTripById({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId);
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async removeTrip({ commit, dispatch }, tripId) {
      let res = await api.delete("trips/" + tripId);
      dispatch("getAllTrips");
    },
    async resetActiveTrip({ commit }) {
      commit("resetActiveTrip");
    }
  }
};
