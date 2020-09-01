import Vue from 'vue';
import Vuex from 'vuex';

const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    applyHolidayItems: [],
    weekdays: weekdaysDefault,
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

    /**
     * 曜日始まり 保存(更新)
     *
     * @param {*} state
     * @param {*} payload
     */
    updateWeekdays(state, payload) {
      state.weekdays = payload.weekdays;
    },
  },
  getters: {},
  actions: {},
  modules: {},
});
