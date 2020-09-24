export default {
  namespaced: true,
  state: {
    name: window.localStorage.getItem("nowName") || "北京",
    id: window.localStorage.getItem("nowId") || 110100,
  },
  actions: {},
  mutations: {
    CITY_INFO(state, payload) {
      state.name = payload.name;
      state.id = payload.id;
    },
  },
};
