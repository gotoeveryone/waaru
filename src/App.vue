<script lang="ts" setup>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

watch(
  () => route.path,
  () => {
    document.title = `Waaru`;
  },
);

const iconColor = "rgb(231, 152, 99)";

const router = useRouter();

const isHome = computed(() => router.currentRoute.value.name === "home");
</script>

<template>
  <v-app class="app">
    <v-row class="ma-0 flex-column align-center justify-start">
      <h2 class="app-title mt-4 mb-2">Waaru (ワール)</h2>
      <div class="app-nav mt-1 mb-1 d-flex" v-if="!isHome">
        <router-link to="/" class="app-nav_link ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-home</v-icon>
        </router-link>
        <router-link to="/about" class="app-nav_link ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-info-circle</v-icon>
        </router-link>
        <a href="https://k2ss.info/contact" target="_blank" class="app-nav_link ml-1 mr-1">
          <v-icon :color="iconColor">fas fa-envelope</v-icon>
        </a>
      </div>
      <router-view />
      <div class="app-copyright mt-2 mb-2">
        &copy; K2SS All rights reserved.
      </div>
    </v-row>
  </v-app>
</template>

<style lang="scss" scoped>
.app {
  font-size: 14px;

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
