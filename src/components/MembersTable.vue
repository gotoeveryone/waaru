<template>
  <v-data-table
    :headers="headers"
    :items="members"
    :no-data-text="noDataText"
    :hide-actions="true"
  >
    <template v-slot:items="props">
      <td class="text-xs-left" v-text="props.item.name" />
      <td
        class="text-xs-right"
        v-text="Number(props.item.amount).toLocaleString()"
      />
      <td class="text-xs-left" v-text="props.item.remarks" />
      <td class="text-xs-center pt-1 pb-1">
        <div class="members-row_actions">
          <v-btn
            fab
            small
            :color="getColor(props.item)"
            @click="switchPayment(props.item)"
          >
            <v-icon color="white">fas fa-check</v-icon>
          </v-btn>
          <v-btn fab small color="red" @click="remove(props.index)">
            <v-icon color="white">fas fa-times</v-icon>
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
        { text: "名前", value: "name", width: "35%" },
        { text: "金額", value: "amount", width: "15%", align: "right" },
        { text: "備考", value: "remarks", width: "30%" },
        {
          text: "操作",
          value: "actions",
          width: "20%",
          align: "center",
          sortable: false
        }
      ];
    }
  },
  methods: {
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

<style lang="scss" scoped>
.members {
  &-row {
    &_actions {
      min-width: 120px;
    }
  }
}
</style>
