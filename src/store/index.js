import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';

const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    applyHolidayItems: [],
    weekdays: { index: 0, value: weekdaysDefault },
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
      state.weekdays.index = payload.index;
      state.weekdays.value = payload.value;
    },
  },
  getters: {
    /**
     * 選択月の合計時間算出
     *
     * @param {*} state
     * @param {*} targetMonth
     */
    totalTime: state => targetMonth => {
      // カレンダーで選択した月のデータがない場合は合計時間を00:00で返す
      if (state.events.length == 0) return '00:00';

      // カレンダーで選択した月のデータを取得
      let targetMonthItems = state.events.filter(
        event => moment(event.date).format('YYYY-MM') === targetMonth
      );

      // 選択月の勤務時刻を算出
      let time = 0;
      targetMonthItems.forEach(function(item) {
        // その日の終了と開始時間の差分取得(9:00～18:00の場合は9が取れる)
        let diff = moment(item.end).diff(item.start, 'hours');
        // 休憩時間を取得
        let breakTime = moment(item.date + ' ' + item.breakTime).hours();
        // 労働時間に休憩時間を引いた数値を追記する
        time += diff - breakTime;
      });

      // 選択月の総合計時間を返す
      return time < 10 ? '0' + time + ':00' : time + ':00';
    },
  },
  actions: {},
  modules: {},
});
