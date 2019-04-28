<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <div>イベント追加</div>
        <v-flex xs12 md4>
          <v-text-field
            v-model="eventName"
            :rules="nameRules"
            :counter="30"
            label="イベント名"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      valid: false,
      eventName: "",
      nameRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => v.length <= 30 || "30文字以下で入力してください"
      ]
    };
  }
});
</script>
