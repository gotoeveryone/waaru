<template>
  <v-app id="app" class="app">
    <v-layout column align-center justify-content-start>
      <h2 class="app-title mt-3 mb-2">Waaru (ワール)</h2>
      <div class="app-nav mt-1 mb-1 d-flex">
        <router-link to="/" class="ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-home</v-icon>
        </router-link>
        <router-link to="/about" class="ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-info-circle</v-icon>
        </router-link>
      </div>
      <router-view />
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    iconColor() {
      return "rgb(231, 152, 99)";
    }
  }
});
</script>

<style lang="scss">
.app {
  &-title {
    font-size: 30px;
  }
}
</style>
