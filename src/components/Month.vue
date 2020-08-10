<template>
  <v-app>
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
          <v-calendar ref="calendar" v-model="focus" color="primary" :event-color="getEventColor"></v-calendar>
        </v-sheet>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'month',
  data: () => ({
    focus: '',
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
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
  },
};
</script>
