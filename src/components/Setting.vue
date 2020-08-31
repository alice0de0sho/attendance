<template>
  <v-container>
    <v-row>
      <v-col cols="2" sm="2" md="2" align-self="center">
        曜日始まり
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="weekdays"
          :items="weekdaysOptions"
          dense
          outlined
          hide-details
          class="mt-3"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6];

export default {
  data: () => ({
    weekdays: weekdaysDefault,
    weekdaysOptions: [
      { text: '日', value: weekdaysDefault },
      { text: '月', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: '火', value: [2, 3, 4, 5, 6, 0, 1] },
      { text: '水', value: [3, 4, 5, 6, 0, 1, 2] },
      { text: '木', value: [4, 5, 6, 0, 1, 2, 3] },
      { text: '金', value: [5, 6, 0, 1, 2, 3, 4] },
      { text: '土', value: [6, 0, 1, 2, 3, 4, 5] },
    ],
  }),
};
</script>
