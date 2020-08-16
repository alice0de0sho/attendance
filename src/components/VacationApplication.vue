<template>
  <v-container>
    <v-row>
      <v-col cols="10">
        <v-data-table :headers="headers" :items="items" sort-by="holiday" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>休暇申請</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">新規作成</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.name" label="区分"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.holiday" label="休暇日"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.startTime" label="開始時刻"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.endTime" label="終了時刻"></v-text-field>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: '区分', align: 'center', sortable: false, value: 'name' },
      { text: '休暇日', align: 'center', sortable: true, value: 'holiday' },
      { text: '開始時刻', align: 'center', sortable: false, value: 'startTime' },
      { text: '終了時刻', align: 'center', sortable: false, value: 'endTime' },
      { text: '操作', align: 'center', sortable: false, value: 'actions' },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      holiday: '',
      startTime: '',
      endTime: '',
    },
    defaultItem: {
      name: '',
      holiday: '',
      startTime: '',
      endTime: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新規作成' : '更新';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = [
        {
          name: '全休',
          holiday: '2020/08/14',
          startTime: '09:00:00',
          endTime: '18:00:00',
        },
        {
          name: '午前休',
          holiday: '2020/08/18',
          startTime: '09:00:00',
          endTime: '14:00:00',
        },
        {
          name: '午後休',
          holiday: '2020/08/28',
          startTime: '13:00:00',
          endTime: '18:00:00',
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm(
        'この休暇申請を削除しますか？' +
          ' 【' +
          item.name +
          ' ' +
          item.holiday +
          ' ' +
          item.startTime +
          ' ' +
          item.endTime +
          '】'
      ) && this.items.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>