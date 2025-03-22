<script lang="ts" setup>
import type { PropType } from "vue";
import type { BreadCrumb } from "@/types";

defineProps({
  items: {
    type: Array as PropType<BreadCrumb[]>,
    default: () => [],
  },
});
</script>

<template>
  <v-breadcrumbs :items="items" divider=">" class="justify-center pt-0 pb-2 pl-0 pr-0" />
</template>
