import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    applyHolidayItems: [],
  },
  mutations: {
    /**
     * 勤怠情報 新規登録
     *
     * @param {*} state
     * @param {*} payload
     */
    createEvents(state, payload) {
      state.events.push(payload.params);
    },

    /**
     * 勤怠情報 更新
     *
     * @param {*} state
     * @param {*} payload
     */
    updateEvents(state, payload) {
      state.events.splice(payload.index, 1, payload.params);
    },

    /**
     * 申請情報 登録
     *
     * @param {*} state
     * @param {*} payload
     */
    applyHoliday(state, payload) {
      state.applyHolidayItems = payload.selected.concat();
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
