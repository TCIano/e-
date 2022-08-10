export default {
  namespaced: true,
  state: {
    currentIndex: {},
    innerCode: "",
    bh: "", // 编号
    zt: "", // 状态
    gdzt: "",
    currentObj: {},
  },
  mutations: {
    getCurrentIndex(state, payload) {
      state.currentIndex = payload;
    },
    getInnerCode(state, payload) {
      state.innerCode = payload;
    },
    getBh(state, payload) {
      state.bh = payload;
    },
    getZt(state, payload) {
      state.zt = payload;
    },
    getGdzt(state, payload) {
      state.gdzt = payload;
    },
    getCurrentObj(state, payload) {
      state.currentObj = payload;
    },
  },
  actions: {
    getCurrentIndex(context, payload) {
      context.commit("getCurrentIndex", payload);
    },
    getBh(context, payload) {
      context.commit("getBh", payload);
    },
    getZt(context, payload) {
      context.commit("getZt", payload);
    },
    getGdzt(context, payload) {
      context.commit("getGdzt", payload);
    },
    getCurrentObj(context, payload) {
      context.commit("getCurrentObj", payload);
    },
  },
};
