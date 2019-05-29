<template>
  <v-container>
    <v-layout column>
      <v-form v-model="valid" ref="form">
        <v-flex md12>
          <bread-crumbs :items="items" />
        </v-flex>
        <v-layout row wrap mb-3>
          <v-flex md12 xs12 text-xs-right>
            <v-btn v-if="isEdit" normal class="mr-0" color="blue" @click="copy">
              <v-icon color="white" left>fas fa-clipboard</v-icon>
              <span class="white--text">Copy URL</span>
            </v-btn>
            <v-btn
              normal
              class="mr-0"
              color="orange"
              @click="save"
              :disabled="!valid"
            >
              <v-icon color="white" left>fas fa-save</v-icon>
              <span class="white--text">Save</span>
            </v-btn>
          </v-flex>
          <v-flex xs12 v-if="isEdit" class="pl-1 pr-1">
            <v-text-field
              v-model="link"
              ref="url"
              label="URL"
              readonly
              @click="selectUrl"
            />
          </v-flex>
          <v-flex xs12 md6 class="pl-1 pr-1">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              :counter="30"
              label="イベント名"
              required
            />
          </v-flex>
          <v-flex xs6 md3 class="pl-1 pr-1">
            <v-dialog
              ref="dialog"
              v-model="showDatePicker"
              :return-value.sync="form.date"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.date"
                  label="日付"
                  v-on="on"
                  clearable
                />
              </template>
              <v-date-picker
                v-model="form.date"
                @input="$refs.dialog.save(form.date)"
              />
            </v-dialog>
          </v-flex>
          <v-flex xs6 md3 class="pl-1 pr-1">
            <v-text-field
              v-model="form.summary"
              :rules="rules.summary"
              label="合計金額"
              suffix="円"
            />
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
      form: {
        name: "",
        date: "",
        summary: "" as string | number
      },
      rules: {
        name: [
          (v: string) => !!v || "必須入力です",
          (v: string) => v.length <= 30 || "30文字以下で入力してください"
        ],
        summary: [
          (v: string) =>
            (!!v && Number.isFinite(Number(v))) || "数値で入力してください"
        ]
      },
      members: [] as Member[],
      snackbar: false,
      timeout: 6000,
      message: "",
      firestore: null,
      showDatePicker: false
    };
  },
  computed: {
    isEdit(): boolean {
      return this.eventId !== "";
    },
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
    link(): string {
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
          const { name, date, summary, members } = data;
          this.form.name = name;
          this.form.date = date;
          this.form.summary =
            summary !== undefined && summary !== null ? summary.toString() : "";
          this.members = members;
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
    getForm() {
      const { name, date, summary } = this.form;
      return {
        name,
        date,
        summary: summary ? Number(summary) : null,
        members: this.members
      };
    },
    save() {
      if (this.eventId) {
        return firebase
          .firestore()
          .collection("events")
          .doc(this.eventId)
          .update(this.getForm())
          .then(() => this.openSnackbar("更新しました"));
      }

      return firebase
        .firestore()
        .collection("events")
        .add(this.getForm())
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
    },
    closeDatePicker() {
      this.showDatePicker = false;
    }
  }
});
</script>
