import { config } from "@vue/test-utils";

// NOTE: vuetify に関するファイルはスタブ化しておく
config.stubs["v-layout"] = true;
config.stubs["v-flex"] = true;

beforeEach(() => {
  // テストの度にモックの実装をクリアする
  vi.clearAllMocks();
});
