<template>
  <div id="header2">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link to="/month">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>勤務状況</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/vacationapplication">
          <v-list-item-action>
            <v-icon>mdi-palm-tree</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>休暇申請</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/setting">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>勤怠管理</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link to="/signin">
            <v-list-item-title>サインアウト</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
/**
 * サインイン後ヘッダーコンポーネント
 */
export default {
  name: 'header2',
  data: () => ({
    drawer: null,
  }),
};
</script>
