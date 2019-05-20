<template>
  <v-breadcrumbs
    :items="items"
    divider=">"
    class="pt-0 pb-2 pl-0 pr-0"
  ></v-breadcrumbs>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    items: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  }
});
</script>
