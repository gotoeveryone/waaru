<template>
  <v-container class="flex-fill pa-6">
    <v-row class="ma-0 flex-column">
      <v-form v-model="valid" ref="form">
        <v-col md12>
          <bread-crumbs :items="items" />
        </v-col>
        <v-row class="ma-0 flex-wrap mb-3">
          <v-col class="px-1 py-2 flex-0-1-100 text-right">
            <v-btn v-if="isEdit" class="mr-2" color="blue" @click="copy">
              <v-icon color="white" class="mr-1">fas fa-clipboard</v-icon>
              <span class="text-white">Copy URL</span>
            </v-btn>
            <v-btn
              class="mr-0"
              :class="{ 'bg-orange': valid }"
              @click="save"
              :disabled="!valid"
            >
              <v-icon color="white" class="mr-1">fas fa-save</v-icon>
              <span class="text-white">Save</span>
            </v-btn>
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-100" v-if="isEdit">
            <v-text-field
              v-model="link"
              ref="url"
              label="URL"
              readonly
              @click="selectUrl"
            />
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-50">
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              :counter="30"
              label="イベント名"
              required
            />
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-25">
            <v-text-field
              :modelValue="formattedDate"
              label="日付"
              clearable
              readonly
              @focus="openDatePicker"
              @click="openDatePicker"
            />
            <v-dialog
              v-model="showDatePicker"
              width="290px"
            >
              <v-date-picker
                v-model="form.date"
                @click.save="closeDatePicker"
                @click.cancel="closeDatePicker"
              />
            </v-dialog>
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-25">
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
          <v-expansion-panel-title :hide-actions="false" expand-icon="fas fa-angle-down" collapse-icon="fas fa-angle-up">
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
        :timeout="timeout"
        location="top"
        color="blue"
        variant="flat"
      >
        <div class="d-flex align-center justify-space-between">
          <span v-text="message" />
          <v-btn color="white" variant="text" @click="closeSnackbar">
            Close
          </v-btn>
        </div>
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
        date: new Date(),
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
    formattedDate() {
      return this.form.date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
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
          this.form.date = new Date(date);
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
      (this.$refs.url as HTMLDivElement).$el.querySelector("input").select();
    },
    copy() {
      this.selectUrl();
      document.execCommand("copy");
      this.openSnackbar("URLをコピーしました");
    },
    getForm() {
      const { name, date, summary } = this.form;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return {
        name,
        date: `${year}-${month}-${day}`,
        summary: summary ? Number(summary) : null,
        members: this.members,
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
    openDatePicker() {
      this.showDatePicker = true;
    },
    closeDatePicker() {
      this.showDatePicker = false;
    },
  },
});
</script>
