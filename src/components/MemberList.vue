<template>
  <v-list xs12 md4 two-line>
    <v-list-tile>
      <v-list-tile-content v-text="member.name" />
      <v-list-tile-content v-text="member.amount" />
      <v-list-tile-content v-text="member.remarks" />
      <v-list-tile-action>
        <v-btn fab small :color="color" @click="switchPayment">
          <v-icon color="white">fas fa-check</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-action>
        <v-btn fab small color="red" @click="remove">
          <v-icon color="white">fas fa-times</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import { Prop, Member } from "@/types";
export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true
    },
    member: {
      type: Object as Prop<Member>,
      required: true
    }
  },
  computed: {
    color(): string {
      return this.member.isPayment ? "green" : "#ccc";
    }
  },
  methods: {
    switchPayment($event: Event) {
      this.member.isPayment = !this.member.isPayment;
    },
    remove($event: Event) {
      this.$emit("remove-item", this.index);
    }
  }
});
</script>
