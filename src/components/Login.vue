<template>
  <div id="app">
    <v-app>
      <v-card width="700px" class="mx-auto mt-5">
        <v-card-title>
          <h1 class="display-1">ログイン</h1>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              @click:append="showPassword = !showPassword"
            />
            <v-card-actions>
              <v-btn class="info" @click="login">ログイン</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',

  data: () => ({
    showPassword: false,
  }),
  methods: {
    // ログインイベント
    login() {
      this.$router.push('/menu');
    },
  },
};
</script>
