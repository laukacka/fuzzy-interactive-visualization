import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  rows: [],
  columns: [],
  header: ''
};

const mutations = {
  LOAD_ROWS(state, payload) {
    state.rows = payload;
  },
  LOAD_COLUMNS(state, payload) {
    state.columns = payload;
  },
  LOAD_HEADER(state, payload) {
    state.header = payload;
  }
};

const actions = {
  loadRows(context, rows) {
    context.commit("LOAD_ROWS", rows);
  },
  loadColumns(context, columns) {
    context.commit("LOAD_COLUMNS", columns);
  },
  loadHeader(context, header) {
    context.commit("LOAD_HEADER", header);
  }
};

const getters = {
  getRows(state) {
    return state.rows;
  },
  getColumns(state) {
    return state.columns;
  },
  getHeader(state) {
    return state.header;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
