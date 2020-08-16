<template>
  <v-container class="fill-height">
    <v-col>
      <v-sheet height="40" color="grey lighten-3" class="d-flex">
        <v-btn icon color="blue" @click="$refs.calendar.prev()">
          <v-icon dark>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon color="blue" @click="$refs.calendar.next()">
          <v-icon dark>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          locale="ja-jp"
          v-model="focus"
          color="primary"
          :day-format="timestamp => new Date(timestamp.date).getDate()"
          :month-format="timestamp => (new Date(timestamp.date).getMonth() + 1) + ' /'"
          :type="type"
          :now="today"
          :events="events"
          :event-color="getEventColor"
          @click:date="createEvent"
          @click:event="showEvent"
        ></v-calendar>
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
import CreateComponent from './CreateComponent';
import moment from 'moment';

export default {
  name: 'month',
  data: () => ({
    focus: '',
    today: moment(new Date()).format('YYYY-MM-DD'),
    type: 'month',
    events: [
      {
        name: '午後休',
        remarks: 'あたりまえ体操をする',
        start: '2020-08-10 13:00:00',
        end: '2020-08-10 14:00:00',
        color: 'blue',
        date: '2020-08-10',
      },
    ],
    dialog: false,
    snackbar: false,
    snackbarText: '',
    compTitle: '',
  }),
  components: {
    CreateComponent,
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    createEvent({ date }) {
      this.compTitle = '新規登録';
      this.$refs.form.open(date);
    },
    saveEvent(params) {
      // 存在チェック
      let some = this.events.some(
        e => e.name === params.name && e.start === params.start && e.end === params.end
      );
      console.log(`some: ${some}`); // some: true

      // 勤怠情報配列に存在しない場合
      if (!some) {
        let index = this.events.findIndex(e => e.date === params.date);
        if (index === -1) {
          // 新規追加
          this.events.push(params);
          this.snackbar = true;
          this.snackbarText = '保存しました。';
          console.log(`保存しました。`, params);
        } else {
          // 更新
          this.events.splice(index, 1, params);
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
    viewDay() {
      //alert('a');
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showDay({ date }) {
      //console.log(date);
      // 今日の日付に設定する。
      this.focus = date;
      //this.type = 'day';
    },
    showEvent({ event }) {
      this.compTitle = '更新';
      this.$refs.form.openEvent(event);
    },
  },
};
</script>
