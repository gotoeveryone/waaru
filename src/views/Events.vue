<template>
  <div class="home">
    <h1>イベント一覧</h1>
    <ul class="Events__Table">
      <event-item
        v-for="(item, idx) in events"
        :key="idx"
        :item="item"
        class="Events__TableRow"
      />
    </ul>
    <input type="text" v-model="name" />
    <button type="button" @click="addEvent">登録</button>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import EventItem from "@/components/EventItem.vue";

export default Vue.extend({
  name: "events",
  components: {
    EventItem
  },
  data() {
    return {
      dbRef: null as firebase.database.Reference | null,
      name: "",
      events: [] as firebase.firestore.DocumentData
    };
  },
  created() {
    firebase
      .firestore()
      .collection("events")
      .onSnapshot(snapshot => {
        console.log("jejeje");
        this.events = snapshot.docs.map(d => d.data());
      });
  },
  methods: {
    addEvent($event: Event) {
      return firebase
        .firestore()
        .collection("events")
        .add({
          name: this.name
        });
    }
  }
});
</script>

<style scoped lang="scss">
.Events__Table {
  margin: 0.5rem auto;
  padding: 0.5rem;
  min-width: 300px;
  max-width: 600px;
  list-style: none;
}
.Events__TableRow:nth-child(even) {
  background-color: #eee;
}
</style>
