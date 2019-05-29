<template>
  <v-data-table
    :headers="headers"
    :items="members"
    :no-data-text="noDataText"
    :hide-actions="true"
    class="members"
  >
    <template v-slot:items="props">
      <td class="text-xs-left" v-text="props.item.name" />
      <td class="text-xs-right" v-text="getAmount(props.item.plannedAmount)" />
      <td class="text-xs-right" v-text="getAmount(props.item.amount)" />
      <td class="text-xs-left" v-text="props.item.remarks" />
      <td class="text-xs-center pt-1 pb-1">
        <div class="members-row_actions">
          <v-btn
            icon
            small
            :color="getColor(props.item)"
            @click="switchPayment(props.item)"
          >
            <v-icon small color="white">fas fa-check</v-icon>
          </v-btn>
          <v-btn icon small color="red" @click="remove(props.index)">
            <v-icon small color="white">fas fa-times</v-icon>
          </v-btn>
        </div>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Member } from "@/types";
export default Vue.extend({
  props: {
    members: {
      type: Array as PropType<Member[]>,
      default: () => []
    }
  },
  computed: {
    noDataText() {
      return "メンバーがいません";
    },
    headers() {
      return [
        { text: "名前", value: "name", width: "28%" },
        {
          text: "予定金額",
          value: "plannedAmount",
          width: "14%",
          align: "right"
        },
        { text: "支払金額", value: "amount", width: "14%", align: "right" },
        { text: "備考", value: "remarks", width: "39%" },
        {
          text: "支払済 / 削除",
          value: "actions",
          width: "5%",
          align: "center",
          sortable: false
        }
      ];
    }
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
    }
  }
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
