<template>
  <v-container>
    <v-layout column>
      <v-form v-model="valid">
        <v-flex md12>
          <bread-crumbs :items="items" />
        </v-flex>
        <v-layout row wrap mb-3>
          <template v-if="eventId">
            <v-flex xs10 md11>
              <v-text-field
                v-model="eventUrl"
                ref="url"
                label="URL"
                readonly
                @click="selectUrl"
              />
            </v-flex>
            <v-flex xs2 md1 text-xs-center>
              <v-btn fab small class="mr-0" color="blue" @click="copy">
                <v-icon color="white">fas fa-clipboard</v-icon>
              </v-btn>
            </v-flex>
          </template>
          <v-flex xs10 md11>
            <v-text-field
              v-model="eventName"
              :rules="nameRules"
              :counter="30"
              label="イベント名"
              required
            />
          </v-flex>
          <v-flex xs2 md1 text-xs-center>
            <v-btn
              fab
              small
              class="mr-0"
              color="orange"
              @click="save"
              :disabled="!valid"
            >
              <v-icon color="white">fas fa-save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <members-table :members="members" @remove-item="removeMember" />
      </v-form>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <v-flex md12>
              <v-icon small color="blue" class="mr-2">fas fa-user</v-icon>
              メンバー追加
            </v-flex>
          </template>
          <add-member-form @add-member="addMember" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-snackbar
        v-model="snackbar"
        :top="true"
        :timeout="timeout"
        color="blue"
      >
        <span v-text="message" />
        <v-btn color="white" flat @click="closeSnackbar">
          Close
        </v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";
import AddMemberForm from "@/components/AddMemberForm.vue";
import BreadCrumbs from "@/components/TheBreadCrumbs.vue";
import MembersTable from "@/components/MembersTable.vue";
import metaUsable from "@/mixins/meta-usable";
import { EventItem, Member, BreadCrumb } from "@/types";

export default Vue.extend({
  components: {
    AddMemberForm,
    BreadCrumbs,
    MembersTable
  },
  mixins: [metaUsable],
  data() {
    return {
      valid: false,
      eventId: "",
      eventName: "",
      nameRules: [
        (v: string) => !!v || "必須入力です",
        (v: string) => v.length <= 30 || "30文字以下で入力してください"
      ],
      members: [] as Member[],
      snackbar: false,
      timeout: 6000,
      message: "",
      firestore: null
    };
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
    title(): string {
      return `イベント${this.eventId ? "編集" : "追加"}`;
    },
    eventUrl(): string {
      return `${location.origin}/events/${this.eventId}`;
    }
  },
  async mounted() {
    if (this.$route.params.id) {
      this.eventId = this.$route.params.id;
      await firebase
        .firestore()
        .collection("events")
        .doc(this.eventId)
        .get()
        .then(doc => {
          const data = doc.data() as EventItem;
          if (!data) {
            return this.$router.replace({ name: "not-found" });
          }
          this.eventName = data.name;
          this.members = data.members;
        });
    }
  },
  methods: {
    addMember(member: Member) {
      this.members.push(member);
    },
    removeMember(index: number) {
      this.members.splice(index, 1);
    },
    selectUrl() {
      (this.$refs.url as any).$refs.input.select();
    },
    copy() {
      this.selectUrl();
      document.execCommand("copy");
      this.openSnackbar("URLをコピーしました");
    },
    save() {
      if (this.eventId) {
        return firebase
          .firestore()
          .collection("events")
          .doc(this.$route.params.id)
          .update({
            name: this.eventName,
            members: this.members
          })
          .then(() => this.openSnackbar("更新しました"));
      }

      return firebase
        .firestore()
        .collection("events")
        .add({
          name: this.eventName,
          members: this.members
        })
        .then(referense => {
          this.eventId = referense.id;
          this.openSnackbar("登録しました");
          this.$router.replace({
            name: "edit-event",
            params: { id: this.eventId }
          });
        });
    },
    openSnackbar(message: string) {
      this.message = message;
      this.snackbar = true;
    },
    closeSnackbar() {
      this.snackbar = false;
    }
  }
});
</script>
