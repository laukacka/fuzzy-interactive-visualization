import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  header: '',
  isShownArrow: false,
  rows: [],
  columns: [],
  membershipFunction: [],
  clusters: []
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
  },
  LOAD_MEMBERSHIPFUNCTION(state, payload) {
    state.membershipFunction = payload;
  },
  LOAD_CLUSTERS(state, payload) {
    state.clusters = payload;
  }
  ,
  LOAD_ISSHOWNARROW(state, payload) {
    state.isShownArrow = payload;
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
  },
  loadMembershipFunction(context, membershipFunction) {
    context.commit("LOAD_MEMBERSHIPFUNCTION", membershipFunction);
  },
  loadClusters(context, clusters) {
    context.commit("LOAD_CLUSTERS", clusters);
  },
  loadIsShownArrow(context, isShownArrow) {
    context.commit("LOAD_ISSHOWNARROW", isShownArrow);
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
  },
  getMembershipFunction(state) {
    return state.membershipFunction;
  },
  getClusters(state) {
    return state.clusters;
  },
  getIsShownArrow(state){
    return state.isShownArrow;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
