import { config } from "@vue/test-utils";

// NOTE: vuetify に関するファイルはスタブ化しておく
config.global.stubs["v-layout"] = true;
config.global.stubs["v-col"] = true;

beforeEach(() => {
  // テストの度にモックの実装をクリアする
  vi.clearAllMocks();
});
