<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{title}}</span>
        </v-card-title>
        <v-card-text id="scroll-target">
          <v-container>
            <v-alert type="error" v-model="errDisplay">{{errMessage}}</v-alert>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select label="区分" :items="items" v-model="name" @change="autoInputTime"></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menuStart"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="start"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="start"
                      label="出社時刻"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      :disabled="disabledText"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuStart"
                    v-model="start"
                    full-width
                    @click:minute="$refs.menu.save(start)"
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" sm="6" md="6">
                <v-menu
                  ref="menu2"
                  v-model="menuEnd"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="end"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="end"
                      label="退社時刻"
                      prepend-icon="mdi-clock-outline"
                      readonly
                      :disabled="disabledText"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuEnd"
                    v-model="end"
                    full-width
                    @click:minute="$refs.menu2.save(end)"
                    format="24hr"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-radio-group v-model="color" row>
                  <v-radio label="red" color="red" value="red"></v-radio>
                  <v-radio label="yellow" color="yellow" value="yellow"></v-radio>
                  <v-radio label="blue" color="blue" value="blue"></v-radio>
                  <v-radio label="green" color="green" value="green"></v-radio>
                  <v-radio label="orange" color="orange" value="orange"></v-radio>
                  <v-radio label="gray" color="gray" value="gray"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field label="備考" required v-model="remarks"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false; resetScrollTop()">閉じる</v-btn>
          <v-btn color="blue darken-1" text @click="save">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment';

export default {
  data: () => ({
    dialog: false,
    start: null,
    end: null,
    date: '',
    name: '',
    items: ['出社', '全休', '午前休', '午後休'],
    remarks: '',
    color: '',
    errDisplay: false,
    errMessage: '',
    menuStart: false,
    menuEnd: false,
    disabledText: false,
  }),
  props: {
    title: {
      type: String,
      default: '新規登録',
    },
  },
  methods: {
    open(date) {
      this.dialog = true;
      this.date = date;
      this.start = null;
      this.end = null;
      this.name = '';
      this.remarks = '';
      this.color = '';
      this.errDisplay = false;
      this.errMessage = '';
    },
    openEvent(event) {
      this.dialog = true;
      this.date = event.date;
      this.start = moment(event.start).format('HH:mm:ss');
      this.end = moment(event.end).format('HH:mm:ss');
      this.name = event.name;
      this.color = event.color;
      this.remarks = event.remarks;
      this.errDisplay = false;
      this.errMessage = '';
    },
    save() {
      if (this.name === '') {
        this.errDisplay = true;
        this.errMessage = '区分を入力してください。';
        this.resetScrollTop();
        return;
      }

      if (!this.isNotNull(this.start, this.end)) {
        this.errDisplay = true;
        this.errMessage = '時刻を入力してください。';
        this.resetScrollTop();
        return;
      }

      if (!this.compareDate(this.start, this.end)) {
        this.errDisplay = true;
        this.errMessage = '終了時刻を開始時刻の後にしてください。';
        this.resetScrollTop();
        return;
      }

      if (this.color === '') {
        this.errDisplay = true;
        this.errMessage = '色を選択してください。';
        this.resetScrollTop();
        return;
      }

      const params = {
        name: this.name,
        start: this.date + ' ' + this.start,
        end: this.date + ' ' + this.end,
        color: this.color,
        remarks: this.remarks,
        date: this.date,
      };

      console.log(params);

      // 子→親へ通知する
      this.$emit('save', params);
      this.dialog = false;
      this.errDisplay = false;
      this.errMessage = '';
      this.resetScrollTop();
    },
    isNotNull(start, end) {
      return start && end;
    },
    compareDate(start, end) {
      return start < end;
    },
    resetScrollTop() {
      let elements = document.getElementsByClassName('v-dialog--active');
      if (!elements || !elements.length) {
        // 要素が取得できなかった場合は終了
        return;
      }
      elements[0].scrollTop = 0;
    },
    autoInputTime() {
      switch (this.name) {
        case '出社':
          this.start = '09:00:00';
          this.end = '18:00:00';
          this.disabledText = false;
          break;
        case '午前休':
          this.start = '14:00:00';
          this.end = '18:00:00';
          this.disabledText = false;
          break;
        case '午後休':
          this.start = '09:00:00';
          this.end = '13:00:00';
          this.disabledText = false;
          break;
        case '全休':
          this.start = '';
          this.end = '';
          this.disabledText = true;
          break;
      }
    },
  },
};
</script>