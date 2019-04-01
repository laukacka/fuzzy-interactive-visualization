import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  rows: []
};

const mutations = {
  LOAD_DATA(state, payload) {
    state.rows = payload;
  }
};

const actions = {
  loadData(context, rows) {
    context.commit("LOAD_DATA", rows);
  }
};

const getters = {
  getData(state) {
    return state.rows;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
