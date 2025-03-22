<template>
  <div>
    <v-row class="ma-0 flex-wrap justify-center mt-12">
      <v-col class="pa-0 flex-0-1-50">
        <v-btn class="mx-2 my-4 btn-start" color="blue" to="/events/new">
          <span class="btn-start_text">イベントを<br />登録する</span>
        </v-btn>
      </v-col>
      <v-col class="pa-0 flex-0-1-50">
        <v-btn class="mx-2 my-4 btn-start" color="blue" to="/about">
          <span class="btn-start_text">Waaru(ワール)<br />とは？</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="ma-0 flex-wrap justify-center mt-12">
      <v-col class="pa-0 flex-0-1-100 text-center">
        <a href="https://k2ss.info/contact" target="_blank">お問い合わせ</a>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.btn-start {
  width: 140px;
  height: 140px !important;

  &_text {
    text-transform: none;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
</style>
