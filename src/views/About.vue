<template>
  <v-container>
    <v-layout column>
      <v-flex md12>
        <bread-crumbs :items="items" />
      </v-flex>
      <v-flex md12>
        <h2 class="mt-1 mb-2" v-text="title"></h2>
      </v-flex>
      <v-flex md12>
        <p>
          飲み会やパーティなどのイベントがあったとき、割り勘した結果を保存しておくことができるサービスです。
        </p>
        <p>
          <span class="about_emphasis"
            >ログインが不要（URLを知っていれば共有可能）</span
          >
        </p>
        <p>
          なので、メモ代わりに利用できます。
        </p>
        <h3>Waaru でできること</h3>
        <ul class="about_cando">
          <li class="mb-2 mt-2 d-flex align-center">
            <v-icon color="orange" class="about_cando_icon mr-2"
              >fas fa-sticky-note</v-icon
            >
            <span class="about_cando_text">イベント情報の登録・更新</span>
          </li>
          <li class="mb-2 mt-2 d-flex align-center">
            <v-icon color="blue" class="about_cando_icon mr-2"
              >fas fa-user</v-icon
            >
            <span class="about_cando_text"
              >イベント参加メンバーの登録・更新</span
            >
          </li>
          <li class="mb-2 mt-2 d-flex align-center">
            <v-icon color="gray" class="about_cando_icon mr-2"
              >fas fa-clipboard</v-icon
            >
            <span class="about_cando_text">URLをボタン1つでコピーして共有</span>
          </li>
          <li class="mb-2 mt-2 d-flex align-center">
            <v-icon color="green" class="about_cando_icon mr-2"
              >fas fa-check</v-icon
            >
            <span class="about_cando_text">支払済みかをマーク</span>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BreadCrumbs from "@/components/TheBreadCrumbs.vue";
import { BreadCrumb } from "@/types";

export default Vue.extend({
  components: {
    BreadCrumbs
  },
  computed: {
    items(): BreadCrumb[] {
      return [
        {
          text: "ホーム",
          disabled: false,
          to: "/"
        },
        {
          text: this.title,
          disabled: true
        }
      ];
    },
    title() {
      return "Waaru (ワール) とは";
    }
  }
});
</script>

<style lang="scss" scoped>
.about {
  &_emphasis {
    color: rgb(235, 33, 33);
    font-size: 16px;
    font-weight: bold;
  }

  &_cando {
    list-style: none;
    padding: 0;

    &_icon {
      width: 25px;
      height: 25px;
    }

    &_text {
      width: calc(100% - 25px);
    }
  }
}
</style>
