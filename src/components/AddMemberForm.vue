<template>
  <v-form v-model="valid" xs12 ref="form">
    <v-container>
      <v-row class="ma-0 flex-wrap align-center justify-space-around">
        <v-col xs12 md4>
          <v-text-field
            v-model="name"
            :rules="rules.name"
            :counter="10"
            label="名前"
            required
          />
        </v-col>
        <v-col xs12 md3>
          <v-text-field
            v-model="plannedAmount"
            :rules="rules.amount"
            label="予定金額"
            required
            xs3
            suffix="円"
          />
        </v-col>
        <v-col xs12 md3>
          <v-text-field
            v-model="amount"
            :rules="rules.amount"
            label="支払金額"
            required
            xs3
            suffix="円"
          />
        </v-col>
        <v-col xs12 md4>
          <v-text-field v-model="remarks" label="備考" />
        </v-col>
        <v-col xs12 md1 text-xs-center>
          <v-btn fab small color="blue" @click="addMember" :disabled="!valid">
            <v-icon color="white">fas fa-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      valid: false,
      rules: {
        name: [
          (v: string) => !!v || "必須入力です",
          (v: string) =>
            (v && v.length <= 10) || "10文字以下で入力してください",
        ],
        amount: [
          (v: string) => !!v || "必須入力です",
          (v: string) =>
            (v && Number.isFinite(Number(v))) || "数値で入力してください",
        ],
      },
      name: "",
      plannedAmount: null,
      amount: null,
      remarks: "",
    };
  },
  methods: {
    clearValues() {
      (this.$refs.form as HTMLFormElement).reset();
    },
    addMember() {
      this.$emit("add-member", {
        name: this.name,
        plannedAmount: Number(this.plannedAmount),
        amount: Number(this.amount),
        remarks: this.remarks || "",
        isPayment: false,
      });
      this.clearValues();
    },
  },
});
</script>
