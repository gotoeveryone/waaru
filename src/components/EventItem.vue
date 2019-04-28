<template>
  <li class="EventItem">
    <span class="EventItem__Name" v-text="item.name"></span>
    <ul v-if="item.members" class="EventItem__MemberTable">
      <li>参加者</li>
      <li
        v-for="(member, idx) in item.members"
        :key="idx"
        class="EventItem__MemberRow"
      >
        <span class="EventItem__NameCell" v-text="member.name" />
        <span class="EventItem__MemberRow" v-text="member.name" />
        <span class="EventItem__ButtonCell">
          <button type="button" @click="update()" />
        </span>
      </li>
    </ul>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, EventItem } from "@/types";

export default Vue.extend({
  props: {
    item: {
      type: Object as Prop<EventItem>,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.EventItem {
  margin: 0;
  padding: 0.3rem 0.5rem;
  width: 100%;
  &__MemberTable {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #999;
  }
  &__MemberRow {
    margin: 0;
    padding: 0.5rem 0;
    width: 100%;
    &:not(:first-child) {
      border-top: 1px solid #999;
    }
  }
}
.col1 {
  width: 20%;
}
.col2 {
  width: 80%;
}
</style>
