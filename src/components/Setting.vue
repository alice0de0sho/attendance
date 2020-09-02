<template>
  <v-container>
    <v-row>
      <v-col cols="2" sm="2" md="2" align-self="center">
        曜日始まり
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-btn-toggle v-model="weekdaysDisp" mandatory color="primary">
          <v-btn v-for="weekday in weekdaysOptions" :key="weekday.value">
            {{ weekday.text }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row
      ><v-spacer></v-spacer
      ><v-btn color="primary" dark class="mb-2" @click="saveWeekdays">保存</v-btn></v-row
    >
  </v-container>
</template>

<script>
/**
 * 設定画面コンポーネント
 */
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
    weekdaysDisp: [],
    weekdaysOptions: [
      { text: '日曜日', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: '月曜日', value: [1, 2, 3, 4, 5, 6, 0] },
    ],
  }),

  computed: {
    ...mapState(['weekdays']),
  },

  /**
   * @description 初期化処理の呼び出し（DOM生成前）
   */
  created() {
    this.initialize();
  },

  methods: {
    ...mapMutations(['updateWeekdays']),

    /**
     * @description 初期化処理
     */
    initialize() {
      this.weekdaysDisp = this.weekdays.index;
    },

    /**
     * @description 保存処理
     */
    saveWeekdays() {
      if (confirm('設定を保存しますか？')) {
        this.updateWeekdays({
          index: this.weekdaysDisp,
          value: this.weekdaysOptions[this.weekdaysDisp].value,
        });
      }
    },
  },
};
</script>
