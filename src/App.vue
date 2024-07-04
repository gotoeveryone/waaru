<template>
  <v-app id="app" class="app">
    <v-layout column align-center justify-content-start>
      <h2 class="app-title mt-3 mb-2">Waaru (ワール)</h2>
      <div class="app-nav mt-1 mb-1 d-flex" v-if="!isHome()">
        <router-link to="/" class="app-nav_link ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-home</v-icon>
        </router-link>
        <router-link to="/about" class="app-nav_link ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-info-circle</v-icon>
        </router-link>
        <a
          href="https://k2ss.info/contact"
          target="_blank"
          class="app-nav_link ml-1 mr-1"
        >
          <v-icon :color="iconColor">fas fa-envelope</v-icon>
        </a>
      </div>
      <router-view />
      <div class="app-copyright mt-2 mb-2">
        &copy; K2SS All rights reserved.
      </div>
      <div ref="ad" />
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    isProduction() {
      return (import.meta as any).env.PROD as boolean;
    },
    iconColor() {
      return "rgb(231, 152, 99)";
    },
  },
  mounted() {
    if (this.isProduction) {
      (this.$refs.ad as HTMLDivElement).innerHTML = (
        document.querySelector(".ad-html") as HTMLDivElement
      ).innerHTML;
    }
  },
  methods: {
    isHome() {
      return this.$router.currentRoute.name === "home";
    },
  },
});
</script>

<style lang="scss" scoped>
.app {
  &-title {
    font-size: 30px;
  }

  &-nav {
    &_link {
      text-decoration: none;
    }
  }

  &-copyright {
    font-size: 12px;
  }
}
</style>
