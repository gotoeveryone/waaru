<template>
  <v-breadcrumbs
    :items="items"
    divider=">"
    class="justify-center pt-0 pb-2 pl-0 pr-0"
  />
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BreadCrumb } from "@/types";
export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<BreadCrumb[]>,
      default: () => [],
    },
  },
});
</script>
