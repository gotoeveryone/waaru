<template>
  <div>
    <v-layout row wrap justify-center mt-5>
      <v-flex md6>
        <v-btn class="btn-start" color="blue" to="/events/new">
          <span class="btn-start_text">イベントを<br />登録する</span>
        </v-btn>
      </v-flex>
      <v-flex md6>
        <v-btn class="btn-start" color="blue" to="/about">
          <span class="btn-start_text">Waaru (ワール) <br />とは？</span>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center mt-5>
      <v-flex md12 text-xs-center>
        <a href="https://k2ss.info/contact" target="_blank">お問い合わせ</a>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "home"
});
</script>

<style lang="scss" scoped>
.btn-start {
  width: 140px;
  height: 140px;

  &_text {
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
</style>
