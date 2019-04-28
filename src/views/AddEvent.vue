<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout column>
        <div>イベント追加</div>
        <v-flex xs12 md4>
          <v-text-field
            v-model="eventName"
            :rules="nameRules"
            :counter="30"
            label="イベント名"
            required
          ></v-text-field>
        </v-flex>
        <template v-for="(member, idx) in members">
          <member-list
            :index="idx"
            :member="member"
            :key="idx"
            @remove-item="removeMember"
          />
        </template>
        <add-member-form @add-member="addMember" />
        <v-btn @click="save" :disabled="!valid">保存</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import AddMemberForm from "@/components/AddMemberForm.vue";
import MemberList from "@/components/MemberList.vue";
import { Member } from "@/types";
export default Vue.extend({
  components: {
    AddMemberForm,
    MemberList
  },
  data() {
    return {
      valid: false,
      eventName: "",
      nameRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => v.length <= 30 || "30文字以下で入力してください"
      ],
      members: [] as Member[]
    };
  },
  methods: {
    addMember(member: Member) {
      this.members.push(member);
    },
    removeMember(index: number) {
      this.members.splice(index, 1);
    },
    save() {
      return firebase
        .firestore()
        .collection("events")
        .add({
          name: this.eventName,
          members: this.members
        })
        .then(referense => console.log(referense.id));
    }
  }
});
</script>
