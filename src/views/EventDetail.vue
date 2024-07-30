<template>
  <v-container>
    <v-row class="ma-0 flex-column">
      <v-form v-model="valid" ref="form">
        <v-col md12>
          <bread-crumbs :items="items" />
        </v-col>
        <v-row class="ma-0 flex-wrap mb-3">
          <v-col class="pa-0 flex-0-1-100 text-right">
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
          </v-col>
          <v-col class="pa-0 flex-0-1-100 px-1" v-if="isEdit">
            <v-text-field
              v-model="link"
              ref="url"
              label="URL"
              readonly
              @click="selectUrl"
            />
          </v-col>
          <v-col class="pa-0 flex-0-1-100">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              :counter="30"
              label="イベント名"
              required
            />
          </v-col>
          <v-col class="pa-0 flex-0-1-50">
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
                @input="onChangeDate(form.date)"
              />
            </v-dialog>
          </v-col>
          <v-col class="pa-0 flex-0-1-50">
            <v-text-field
              v-model="form.summary"
              :rules="rules.summary"
              label="合計金額"
              suffix="円"
            />
          </v-col>
        </v-row>
        <members-table :members="members" @remove-item="removeMember" />
      </v-form>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title :hide-actions="false">
            <v-icon size="small" color="blue" class="mr-2">fas fa-user</v-icon>
            メンバー追加
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <template v-slot:default>
              <add-member-form @add-member="addMember" />
            </template>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import firebase from "firebase/app";
import "firebase/firestore";
import { defineComponent } from "vue";
import { GlobalComponents } from "vue";
import AddMemberForm from "@/components/AddMemberForm.vue";
import BreadCrumbs from "@/components/TheBreadCrumbs.vue";
import MembersTable from "@/components/MembersTable.vue";
import metaUsable from "@/mixins/meta-usable";
import type { EventItem, Member, BreadCrumb } from "@/types";

export default defineComponent({
  components: {
    AddMemberForm,
    BreadCrumbs,
    MembersTable,
  },
  mixins: [metaUsable],
  data() {
    return {
      valid: false,
      eventId: "",
      form: {
        name: "",
        date: "",
        summary: "" as string | number,
      },
      rules: {
        name: [
          (v: string) => !!v || "必須入力です",
          (v: string) => v.length <= 30 || "30文字以下で入力してください",
        ],
        summary: [
          (v: string) =>
            (!!v && Number.isFinite(Number(v))) || "数値で入力してください",
        ],
      },
      members: [] as Member[],
      snackbar: false,
      timeout: 6000,
      message: "",
      firestore: null,
      showDatePicker: false,
    };
  },
  computed: {
    isEdit(): boolean {
      return this.eventId !== "";
    },
    items(): BreadCrumb[] {
      return [
        {
          title: "ホーム",
          disabled: false,
          to: "/",
        },
        {
          title: this.title,
          disabled: true,
        },
      ];
    },
    title(): string {
      return `イベント${this.eventId ? "編集" : "追加"}`;
    },
    link(): string {
      return `${location.origin}/events/${this.eventId}`;
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      this.eventId = this.$route.params.id as string;
      await firebase
        .firestore()
        .collection("events")
        .doc(this.eventId)
        .get()
        .then((doc) => {
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
        members: this.members,
      };
    },
    onChangeDate(date: string) {
      (this.$refs.dialog as GlobalComponents["VDialog"]).save(date)
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
        .then((referense) => {
          this.eventId = referense.id;
          this.openSnackbar("登録しました");
          this.$router.replace({
            name: "edit-event",
            params: { id: this.eventId },
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
    },
  },
});
</script>
