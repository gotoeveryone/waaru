<template>
  <div>
    <div class="mt-3 mb-5">
      イベントと参加者を登録して、割り勘の情報を登録しよう。
    </div>
    <v-btn class="btn-add" color="blue" to="/events/new" fab
      >イベントを登録する</v-btn
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home"
});
</script>

<style lang="scss" scoped>
.btn-add {
  width: 140px;
  height: 140px;
  color: #fff;
}
</style>
