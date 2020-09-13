<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          item-key="date"
          sort-by="date"
          show-select
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>休暇申請</v-toolbar-title>
              <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
              <v-spacer></v-spacer>
              <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
              <v-btn color="primary" dark class="mb-2" @click="apply">申請</v-btn>
              <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
              <v-dialog v-model="dialog" max-width="500px">
                <!-- <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新規作成</v-btn>
                </template>-->
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            label="区分"
                            :items="kbns"
                            v-model="editedItem.name"
                            @change="autoInputTime"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            v-model="menuDate"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.date"
                                label="休暇日"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date"
                              @input="menuDate = false"
                              :day-format="date => new Date(date).getDate()"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu2"
                            v-model="menuStart"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="editedItem.breakStartTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.breakStartTime"
                                label="開始時刻"
                                prepend-icon="mdi-clock-outline"
                                readonly
                                :disabled="disabledText"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menuStart"
                              v-model="editedItem.breakStartTime"
                              full-width
                              @click:minute="$refs.menu2.save(editedItem.breakStartTime)"
                              format="24hr"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu3"
                            v-model="menuEnd"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="editedItem.breakEndTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.breakEndTime"
                                label="終了時刻"
                                prepend-icon="mdi-clock-outline"
                                readonly
                                :disabled="disabledText"
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="menuEnd"
                              v-model="editedItem.breakEndTime"
                              full-width
                              @click:minute="$refs.menu3.save(editedItem.breakEndTime)"
                              format="24hr"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="16" sm="10" md="8">
                          <v-text-field v-model="editedItem.remarks" label="備考"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">閉じる</v-btn>
                    <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>申請する休暇情報はありません。</template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * 休暇申請コンポーネント
 */
import { mapMutations, mapGetters } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    selected: [],
    headers: [
      { text: '区分', align: 'center', sortable: false, value: 'name' },
      { text: '休暇日', align: 'center', sortable: true, value: 'date' },
      { text: '開始時刻', align: 'center', sortable: false, value: 'breakStartTime' },
      { text: '終了時刻', align: 'center', sortable: false, value: 'breakEndTime' },
      { text: '備考', align: 'center', sortable: false, value: 'remarks' },
      { text: '操作', align: 'center', sortable: false, value: 'actions' },
    ],
    items: [],
    kbns: ['全休', '午前休', '午後休'],
    editedIndex: -1,
    editedItem: {
      name: '',
      date: '',
      breakStartTime: '',
      breakEndTime: '',
      remarks: '',
    },
    defaultItem: {
      name: '',
      date: '',
      breakStartTime: '',
      breakEndTime: '',
      remarks: '',
    },
    applyItems: [],
    menu: false,
    menuDate: false,
    menuStart: false,
    menuEnd: false,
    disabledText: false,
  }),

  computed: {
    /**
     * @description タイトル設定
     * @returns {any}
     */
    formTitle() {
      return this.editedIndex === -1 ? '新規作成' : '更新';
    },
    ...mapGetters(['vacationInfo']),
  },

  watch: {
    /**
     * @description
     * @param {any} val
     */
    dialog(val) {
      val || this.close();
    },
  },

  /**
   * @description 初期化処理の呼び出し（DOM生成後）
   */
  mounted() {
    this.initialize();
  },

  methods: {
    ...mapMutations(['applyHoliday']),

    /**
     * @description 初期化処理
     */
    initialize() {
      this.items = this.vacationInfo;
    },

    /**
     * @description 一覧の休暇申請を1行更新
     * @param {any} item
     */
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    /**
     * @description 一覧の休暇申請を1行削除
     * @param {any} item
     */
    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm(
        'この休暇申請を削除しますか？' +
          ' 【' +
          item.name +
          ' ' +
          item.date +
          ' ' +
          item.breakStartTime +
          ' ' +
          item.breakEndTime +
          '】'
      ) && this.items.splice(index, 1);
    },

    /**
     * @description 休暇申請ダイアログを閉じる
     */
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    /**
     * @description 休暇申請ダイアログの内容を保存
     */
    save() {
      if (this.editedIndex > -1) {
        this.items.splice(this.editedIndex, 1, this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },

    /**
     * @description 休暇申請実施
     */
    apply() {
      if (this.selected.length === 0) return;
      if (confirm('選択した休暇を申請してよろしいですか？')) {
        this.selected.forEach(element => {
          this.applyHoliday({
            selected: element,
          });
        });

        // 選択した要素をitems配列から削除
        this.selected.forEach(element => {
          this.items.forEach((element2, index) => {
            if (element.date === element2.date) {
              this.items.splice(index, 1);
            }
          });
        });
      }
    },

    /**
     * @description 選択した区分により、開始/終了時刻を自動補完
     */
    autoInputTime() {
      switch (this.editedItem.name) {
        case '午前休':
          this.editedItem.breakStartTime = '09:00';
          this.editedItem.breakEndTime = '13:00';
          break;
        case '午後休':
          this.editedItem.breakStartTime = '14:00';
          this.editedItem.breakEndTime = '18:00';
          break;
        case '全休':
          this.editedItem.breakStartTime = '09:00';
          this.editedItem.breakEndTime = '18:00';
          break;
      }
    },
  },
};
</script>
