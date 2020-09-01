<template>
  <v-container>
    <v-row>
      <v-col cols="2" sm="2" md="2" align-self="center">
        曜日始まり
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="weekdaysDisp"
          :items="weekdaysOptions"
          dense
          outlined
          hide-details
          class="mt-3"
        ></v-select>
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
      { text: '日', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: '月', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: '火', value: [2, 3, 4, 5, 6, 0, 1] },
      { text: '水', value: [3, 4, 5, 6, 0, 1, 2] },
      { text: '木', value: [4, 5, 6, 0, 1, 2, 3] },
      { text: '金', value: [5, 6, 0, 1, 2, 3, 4] },
      { text: '土', value: [6, 0, 1, 2, 3, 4, 5] },
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
      this.weekdaysDisp = this.weekdays;
    },

    /**
     * @description 保存処理
     */
    saveWeekdays() {
      if (confirm('設定を保存しますか？')) {
        this.updateWeekdays({
          weekdays: this.weekdaysDisp,
        });
      }
    },
  },
};
</script>
