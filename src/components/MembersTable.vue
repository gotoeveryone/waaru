<script lang="ts" setup>
import type { PropType } from "vue";
import type { Member } from "@/types";

const noDataText = "メンバーがいません";
const headers = [
  { key: "name", title: "名前", value: "name", width: "28%" },
  {
    key: "plannedAmount",
    title: "予定金額",
    value: "plannedAmount",
    width: "14%",
  },
  { key: "amount", title: "支払金額", value: "amount", width: "14%" },
  { key: "remarks", title: "備考", value: "remarks", width: "auto" },
  {
    title: "支払済 / 削除",
    value: "actions",
    width: "10%",
  },
];

defineProps({
  members: {
    type: Array as PropType<Member[]>,
    default: () => [],
  },
});

const emits = defineEmits(["remove-item"]);

const getAmount = (value: number | null) => {
  if (typeof value === "undefined" || value === null) {
    return "";
  }
  return Number(value).toLocaleString();
};

const getColor = (member: Member) => {
  return member.isPayment ? "green" : "#ccc";
};

const switchPayment = (member: Member) => {
  member.isPayment = !member.isPayment;
};

const remove = (index: number) => {
  emits("remove-item", index);
};
</script>

<template>
  <v-data-table :headers="headers" :items="members" :no-data-text="noDataText" :hide-actions="true"
    :hide-default-footer="true" sort-asc-icon="fas fa-arrow-up" sort-desc-icon="fas fa-arrow-down" class="members">
    <template v-slot:item="props">
      <tr>
        <td class="text-left" v-text="props.item.name" />
        <td class="text-right" v-text="getAmount(props.item.plannedAmount)" />
        <td class="text-right" v-text="getAmount(props.item.amount)" />
        <td class="text-left" v-text="props.item.remarks" />
        <td class="text-center pt-1 pb-1">
          <div class="members-row_actions">
            <v-btn icon size="small" density="comfortable" class="mx-2 my-1" :color="getColor(props.item)"
              @click="switchPayment(props.item)">
              <v-icon size="small" color="white">fas fa-check</v-icon>
            </v-btn>
            <v-btn icon size="small" density="comfortable" class="mx-2 my-1" color="red" @click="remove(props.index)">
              <v-icon size="small" color="white">fas fa-times</v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.members {
  min-width: 650px;

  &-row {
    &_actions {
      min-width: 120px;
    }
  }
}
</style>
