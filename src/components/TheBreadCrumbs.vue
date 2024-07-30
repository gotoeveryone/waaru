<template>
  <v-breadcrumbs
    :items="items"
    divider=">"
    class="justify-center pt-0 pb-2 pl-0 pr-0"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { BreadCrumb } from "@/types";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<BreadCrumb[]>,
      default: () => [],
    },
  },
});
</script>
