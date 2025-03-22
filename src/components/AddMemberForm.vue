<script lang="ts" setup>
import { ref } from "vue";

const rules = {
  name: [
    (v: string) => !!v || "必須入力です",
    (v: string) => (v && v.length <= 10) || "10文字以下で入力してください",
  ],
  amount: [
    (v: string) => !!v || "必須入力です",
    (v: string) =>
      (v && Number.isFinite(Number(v))) || "数値で入力してください",
  ],
};

const form = ref<HTMLFormElement | null>(null);
const valid = ref(false);
const name = ref("");
const plannedAmount = ref(null);
const amount = ref(null);
const remarks = ref("");

const emits = defineEmits(["add-member"]);

const clearValues = () => {
  form.value!.reset();
};
const addMember = () => {
  emits("add-member", {
    name: name.value,
    plannedAmount: Number(plannedAmount.value),
    amount: Number(amount.value),
    remarks: remarks.value,
    isPayment: false,
  });
  clearValues();
};
</script>

<template>
  <v-form v-model="valid" xs12 ref="form">
    <v-container>
      <v-row class="ma-0 flex-wrap align-center justify-space-around">
        <v-col class="v-col-xs-12 v-col-md-4">
          <v-text-field
            v-model="name"
            :rules="rules.name"
            :counter="10"
            label="名前"
            required
          />
        </v-col>
        <v-col class="v-col-xs-12 v-col-md-3">
          <v-text-field
            v-model="plannedAmount"
            :rules="rules.amount"
            label="予定金額"
            required
            suffix="円"
          />
        </v-col>
        <v-col class="v-col-xs-12 v-col-md-4">
          <v-text-field
            v-model="amount"
            :rules="rules.amount"
            label="支払金額"
            required
            suffix="円"
          />
        </v-col>
        <v-col class="v-col-xs-12 v-col-md-4">
          <v-text-field v-model="remarks" label="備考" />
        </v-col>
        <v-col class="v-col-xs-12 v-col-md-1 text-center">
          <v-btn icon density="comfortable" :class="{ 'bg-blue': valid }" @click="addMember" :disabled="!valid">
            <v-icon size="small" color="white">fas fa-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
