<script lang="ts" setup>
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import AddMemberForm from "@/components/AddMemberForm.vue";
import BreadCrumbs from "@/components/TheBreadCrumbs.vue";
import MembersTable from "@/components/MembersTable.vue";
import type { EventItem, Member } from "@/types";

const rules = {
  name: [
    (v: string) => !!v || "必須入力です",
    (v: string) => v.length <= 30 || "30文字以下で入力してください",
  ],
  summary: [
    (v: string) =>
      (!!v && Number.isFinite(Number(v))) || "数値で入力してください",
  ],
};

const db = getFirestore();

const route = useRoute();
const router = useRouter();

const valid = ref(false);
const eventId = ref("");
const name = ref("");
const date = ref(new Date());
const summary = ref<string | number>("");
const members = ref<Member[]>([]);
const snackbar = ref(false);
const timeout = ref(6000);
const snackbarMessage = ref("");
const showDatePicker = ref(false);

onMounted(() => {
  document.title = `${title.value} - Waaru`;
});

onMounted(async () => {
  if (!route.params.id) {
    return;
  }

  eventId.value = route.params.id as string;

  const data = (
    await getDoc(doc(db, "events", eventId.value))
  ).data() as EventItem;
  if (!data) {
    return router.replace({ name: "not-found" });
  }
  name.value = data.name;
  date.value = new Date(data.date);
  summary.value =
    data.summary !== undefined && data.summary !== null
      ? data.summary.toString()
      : "";
  members.value = data.members;
});

const isEdit = computed(() => eventId.value !== "");
const link = computed(() => `${location.origin}/events/${eventId.value}`);
const title = computed(() => {
  return `イベント${isEdit.value ? "編集" : "追加"}`;
});
const breadCrumbs = computed(() => [
  {
    title: "ホーム",
    disabled: false,
    to: "/",
  },
  {
    title: title.value,
    disabled: true,
  },
]);
const formattedDate = computed(() => {
  return date.value.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});
const formValue = computed(() => {
  const year = date.value.getFullYear();
  const month = String(date.value.getMonth() + 1).padStart(2, "0");
  const day = String(date.value.getDate()).padStart(2, "0");
  return {
    name: name.value,
    date: `${year}-${month}-${day}`,
    summary: summary.value ? Number(summary.value) : null,
    members: members.value,
  };
});

watch(
  () => title.value,
  () => {
    document.title = `${title.value} - Waaru`;
  },
);

const addMember = (member: Member) => {
  members.value.push(member);
};
const removeMember = (index: number) => {
  members.value.splice(index, 1);
};
const copy = () => {
  navigator.clipboard.writeText(link.value);
  openSnackbar("URLをコピーしました");
};
const save = () => {
  if (isEdit.value) {
    return updateDoc(doc(db, "events", eventId.value), formValue.value).then(
      () => openSnackbar("更新しました"),
    );
  }

  return addDoc(collection(db, "events"), formValue.value).then((referense) => {
    eventId.value = referense.id;
    openSnackbar("登録しました");
    router.replace({
      name: "edit-event",
      params: { id: eventId.value },
    });
  });
};
const openSnackbar = (message: string) => {
  snackbarMessage.value = message;
  snackbar.value = true;
};
const closeSnackbar = () => {
  snackbar.value = false;
};
const openDatePicker = () => {
  showDatePicker.value = true;
};
const closeDatePicker = () => {
  showDatePicker.value = false;
};
</script>

<template>
  <v-container class="flex-fill pa-6">
    <v-row class="ma-0 flex-column">
      <v-form v-model="valid">
        <v-col md12>
          <bread-crumbs :items="breadCrumbs" />
        </v-col>
        <v-row class="ma-0 flex-wrap mb-3">
          <v-col class="px-1 py-2 flex-0-1-100 text-right">
            <v-btn v-if="isEdit" class="mr-2" color="blue" @click="copy">
              <v-icon color="white" class="mr-1">fas fa-clipboard</v-icon>
              <span class="text-white">Copy URL</span>
            </v-btn>
            <v-btn class="mr-0" :class="{ 'bg-orange': valid }" @click="save" :disabled="!valid">
              <v-icon color="white" class="mr-1">fas fa-save</v-icon>
              <span class="text-white">Save</span>
            </v-btn>
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-100" v-if="isEdit">
            <v-text-field v-model="link" ref="url" label="URL" readonly />
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-50">
            <v-text-field v-model="name" :rules="rules.name" :counter="30" label="イベント名" required />
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-25">
            <v-text-field :modelValue="formattedDate" label="日付" clearable readonly @focus="openDatePicker"
              @click="openDatePicker" />
            <v-dialog v-model="showDatePicker" width="290px">
              <v-date-picker v-model="date" @click.save="closeDatePicker" @click.cancel="closeDatePicker" />
            </v-dialog>
          </v-col>
          <v-col class="pa-0 px-1 flex-0-1-25">
            <v-text-field v-model="summary" :rules="rules.summary" label="合計金額" suffix="円" />
          </v-col>
        </v-row>
        <members-table :members="members" @remove-item="removeMember" />
      </v-form>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title :hide-actions="false" expand-icon="fas fa-angle-down"
            collapse-icon="fas fa-angle-up">
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
      <v-snackbar v-model="snackbar" :timeout="timeout" location="top" color="blue" variant="flat">
        <div class="d-flex align-center justify-space-between">
          <span v-text="snackbarMessage" />
          <v-btn color="white" variant="text" @click="closeSnackbar">
            Close
          </v-btn>
        </div>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
