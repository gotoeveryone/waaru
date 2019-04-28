<template>
  <v-form v-model="valid" xs12>
    <v-flex xs12>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="10"
        label="名前"
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="amount"
        :rules="amountRules"
        label="金額"
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field v-model="remarks" label="備考"></v-text-field>
    </v-flex>
    <v-btn @click="addMember" :disabled="!valid">追加</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Member } from "@/types";
export default Vue.extend({
  data() {
    return {
      valid: false,
      nameRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => v.length <= 10 || "10文字以下で入力してください"
      ],
      amountRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => Number.isFinite(Number(v)) || "数値で入力してください"
      ],
      name: "",
      amount: null,
      remarks: ""
    };
  },
  methods: {
    addMember() {
      this.$emit("add-member", {
        name: this.name,
        amount: this.amount!,
        remarks: this.remarks,
        isPayment: false
      });
    }
  }
});
</script>
