<template>
  <v-app>
    <v-card width="700px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ユーザ登録</h1>
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
            <v-btn class="info" to="/menu">ユーザを登録</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
/**
 * サインアップコンポーネント
 */
export default {
  name: 'SignUp',

  data: () => ({
    showPassword: false,
  }),
};
</script>
