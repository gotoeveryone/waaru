<template>
  <v-container>
    <v-layout column>
      <v-form v-model="valid">
        <v-flex md12>イベント追加</v-flex>
        <v-layout row wrap>
          <v-flex md11>
            <v-text-field
              v-model="eventName"
              :rules="nameRules"
              :counter="30"
              label="イベント名"
              required
            ></v-text-field>
          </v-flex>
          <v-flex md1>
            <v-btn fab small color="orange" @click="save" :disabled="!valid">
              <v-icon color="white">fas fa-save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <members-table :members="members" @remove-item="removeMember" />
      </v-form>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <v-flex md12>メンバー追加</v-flex>
          </template>
          <add-member-form @add-member="addMember" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import AddMemberForm from "@/components/AddMemberForm.vue";
import MembersTable from "@/components/MembersTable.vue";
import { Member } from "@/types";
export default Vue.extend({
  components: {
    AddMemberForm,
    MembersTable
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
