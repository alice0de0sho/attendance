<template>
  <v-container class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">出勤</v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">退勤</v-btn>
          <!-- <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title> -->
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          locale="ja-jp"
          v-model="focus"
          color="primary"
          :type="type"
          :now="today"
          :events="events"
          :event-color="getEventColor"
          @click:date="createEvent"
        ></v-calendar>
        <div id="form-modal">
          <create-component ref="form" @save="saveEvent"></create-component>
        </div>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <!-- <span v-html="selectedEvent.details"></span> -->
              <!-- <span v-html="times"></span> -->
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">閉じる</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script>
import CreateComponent from './CreateComponent';

export default {
  name: 'month',
  data: () => ({
    focus: '',
    today: `2020-08-10`,
    type: 'month',
    selectedEvent: {},
    selectedTime: {},
    selectedElement: null,
    selectedOpen: false,
    events: [
      {
        name: 'あたりまえ体操をする',
        start: '2020-08-10',
        end: '2020-08-10',
        color: 'blue',
      },
    ],
    dialog: false,
    //times: [],
    //colors: ['blue', 'indigo', 'deep-purple', 'cyan'],
    //names: ['出社', '休暇', '午前休', '午後休'],
  }),
  components: {
    CreateComponent,
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    createEvent({ date }) {
      this.$refs.form.open(date);
    },
    saveEvent(params) {
      console.log('calendarcompoennt.xue');
      this.events.push(params);
      console.log(`保存しました。${params}`);
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
      console.log(date);
      // 今日の日付に設定する。
      this.focus = date;
      //this.type = 'day';
    },
    showEvent() {},
    /*showEvent({ nativeEvent, event, time }) {
      console.log(event);
      console.log(nativeEvent);
      console.log(time);
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        this.selectedTime = time;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
      const times = [];
      //console.log(start.date);
      //console.log(end.date);

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      //console.log(days);
      const eventCount = this.rnd(days, days + 20);
      //console.log(eventCount);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          //timed: !allDay,
        });

        times.push({
          start: first,
          end: second,
        });
      }

      this.events = events;
      this.times = times;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },*/
  },
};
</script>
