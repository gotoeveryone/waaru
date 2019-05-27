<template>
  <v-form v-model="valid" xs12 ref="form">
    <v-container>
      <v-layout row wrap align-center justify-space-around>
        <v-flex xs12 md4>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="名前"
            required
          />
        </v-flex>
        <v-flex xs12 md3>
          <v-text-field
            v-model="amount"
            :rules="amountRules"
            label="金額"
            required
            xs3
          />
        </v-flex>
        <v-flex xs12 md4>
          <v-text-field v-model="remarks" label="備考" />
        </v-flex>
        <v-flex xs12 md1 text-xs-center>
          <v-btn fab small color="blue" @click="addMember" :disabled="!valid">
            <v-icon color="white">fas fa-plus</v-icon>
          </v-btn>
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
      nameRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => (v && v.length <= 10) || "10文字以下で入力してください"
      ],
      amountRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) =>
          (v && Number.isFinite(Number(v))) || "数値で入力してください"
      ],
      name: "",
      amount: null,
      remarks: ""
    };
  },
  methods: {
    clearValues() {
      (this.$refs.form as HTMLFormElement).reset();
    },
    addMember() {
      this.$emit("add-member", {
        name: this.name,
        amount: Number(this.amount),
        remarks: this.remarks || "",
        isPayment: false
      });
      this.clearValues();
    }
  }
});
</script>
