<template>
  <v-container class="fill-height">
    <v-col>
      <v-sheet height="60">
        <v-row justify="center">
          <v-card elevation="0" class="mx-1">
            <v-card-text class="pa-0">
              <v-chip x-small>合計</v-chip>
              <br />
              <v-avatar size="44" color="teal">
                <span class="white--text subheading">{{ totalTime(month, 1) }}</span>
              </v-avatar>
            </v-card-text>
          </v-card>
          <v-card elevation="0" class="mx-1">
            <v-card-text class="pa-0">
              <v-chip x-small>残業</v-chip>
              <br />
              <v-avatar size="44" color="teal">
                <span class="white--text subheading">{{ totalTime(month, 2) }}</span>
              </v-avatar>
            </v-card-text>
          </v-card>
        </v-row>
      </v-sheet>
      <v-sheet height="40" color="grey lighten-3" class="d-flex mt-2">
        <v-btn icon color="blue" @click="prev">
          <v-icon dark>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="pt-2">{{ month }}</div>
        <v-spacer></v-spacer>
        <v-btn icon color="blue" @click="next">
          <v-icon dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="450">
        <v-calendar
          ref="calendar"
          locale="ja-jp"
          v-model="focus"
          color="primary"
          :day-format="timestamp => new Date(timestamp.date).getDate()"
          :month-format="timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'"
          :type="type"
          :now="today"
          :events="events"
          :event-color="getEventColor"
          :weekdays="weekdaysDisp"
          @click:date="createEvent"
          @click:event="showEvent"
        >
          <template v-slot:event="props">
            <div class="pl-1">{{ props.event.name }}</div>
          </template>
        </v-calendar>
        <div id="form-modal">
          <create-component ref="form" @save="saveEvent" :title="compTitle"></create-component>
        </div>
      </v-sheet>
    </v-col>
    <v-snackbar v-model="snackbar" color="success" :right="true" :timeout="3000" :top="true">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">閉じる</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
/**
 * 勤怠状況コンポーネント
 */
import CreateComponent from './CreateComponent';
import moment from 'moment';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'month',
  data: () => ({
    focus: '',
    today: moment(new Date()).format('YYYY-MM-DD'),
    type: 'month',
    dialog: false,
    snackbar: false,
    snackbarText: '',
    compTitle: '',
    weekdaysDisp: [],
    month: moment(new Date()).format('YYYY-MM'),
  }),

  computed: {
    ...mapState(['events', 'weekdays']),
    ...mapGetters(['totalTime']),
  },

  /**
   * @description 初期化処理の呼び出し（DOM生成前）
   */
  created() {
    this.initialize();
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  components: {
    CreateComponent,
  },

  methods: {
    ...mapMutations(['createEvents', 'updateEvents']),

    /**
     * @description 初期化処理
     */
    initialize() {
      this.weekdaysDisp = this.weekdays.value;
    },

    /**
     * @description 勤怠状況を新規登録
     * @param {any} { date }
     */
    createEvent({ date }) {
      this.compTitle = '新規登録';
      this.$refs.form.open(date);
    },

    /**
     * @description 勤怠状況を更新
     * @param {any} { event }
     */
    showEvent({ event }) {
      this.compTitle = '更新';
      this.$refs.form.openEvent(event);
    },

    /**
     * @description 勤怠状況をカレンダーに反映
     * @param {any} params
     */
    saveEvent(params) {
      // 存在チェック
      let some = this.events.some(
        e =>
          e.name === params.name &&
          e.date === params.date &&
          e.start === params.start &&
          e.end === params.end
      );
      console.log(`some: ${some}`); // some: true

      // 勤怠情報配列に存在しない場合
      if (!some) {
        let index = this.events.findIndex(e => e.date === params.date);
        if (index === -1) {
          // 新規追加
          this.createEvents({
            params: params,
          });
          this.snackbar = true;
          this.snackbarText = '保存しました。';
          console.log(`保存しました。`, params);
        } else {
          // 更新
          this.updateEvents({
            index: index,
            params: params,
          });
          this.snackbar = true;
          this.snackbarText = '更新しました。';
          console.log(`保存しました。`, params);
        }
      } else {
        this.snackbar = true;
        this.snackbarText = '保存しませんでした。';
        console.log(`保存しませんでした。`, params);
      }
    },

    /**
     * @description 勤怠状況の色取得
     * @param {any} event
     * @returns {any}
     */
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    /**
     * @description カレンダーを前月へ
     */
    prev() {
      this.$refs.calendar.prev();
      this.month = moment(this.month)
        .subtract(1, 'M')
        .format('YYYY-MM');
    },

    /**
     * @description  カレンダーを次月へ
     */
    next() {
      this.$refs.calendar.next();
      this.month = moment(this.month)
        .add(1, 'M')
        .format('YYYY-MM');
    },
  },
};
</script>
