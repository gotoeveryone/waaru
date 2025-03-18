<template>
  <v-data-table
    :headers="headers"
    :items="members"
    :no-data-text="noDataText"
    :hide-actions="true"
    :hide-default-footer="true"
    class="members"
  >
    <template v-slot:item="props">
      <td class="text-left" v-text="props.item.name" />
      <td class="text-right" v-text="getAmount(props.item.plannedAmount)" />
      <td class="text-right" v-text="getAmount(props.item.amount)" />
      <td class="text-left" v-text="props.item.remarks" />
      <td class="text-center pt-1 pb-1">
        <div class="members-row_actions">
          <v-btn
            icon
            size="small"
            density="comfortable"
            class="mx-2 my-1"
            :color="getColor(props.item)"
            @click="switchPayment(props.item)"
          >
            <v-icon size="small" color="white">fas fa-check</v-icon>
          </v-btn>
          <v-btn
            icon
            size="small"
            density="comfortable"
            class="mx-2 my-1"
            color="red"
            @click="remove(props.index)"
          >
            <v-icon size="small" color="white">fas fa-times</v-icon>
          </v-btn>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Member } from "@/types";

export default defineComponent({
  props: {
    members: {
      type: Array as PropType<Member[]>,
      default: () => [],
    },
  },
  computed: {
    noDataText() {
      return "メンバーがいません";
    },
    headers() {
      return [
        { title: "名前", value: "name", width: "28%" },
        {
          title: "予定金額",
          value: "plannedAmount",
          width: "14%",
        },
        { title: "支払金額", value: "amount", width: "14%" },
        { title: "備考", value: "remarks", width: "auto" },
        {
          title: "支払済 / 削除",
          value: "actions",
          width: "10%",
          sortable: false,
        },
      ];
    },
  },
  methods: {
    getAmount(value: number | null) {
      if (typeof value === "undefined" || value === null) {
        return "";
      }
      return Number(value).toLocaleString();
    },
    getColor(member: Member) {
      return member.isPayment ? "green" : "#ccc";
    },
    switchPayment(member: Member) {
      member.isPayment = !member.isPayment;
    },
    remove(index: number) {
      this.$emit("remove-item", index);
    },
  },
});
</script>

<style lang="scss">
.members {
  .v-datatable {
    min-width: 650px;
  }
}
</style>

<style lang="scss" scoped>
.members {
  &-row {
    &_actions {
      min-width: 120px;
    }
  }
}
</style>
