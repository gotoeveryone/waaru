import { config } from "@vue/test-utils";

const StubComponent = {
  template: `<div><slot /></div>`
};

// NOTE: vuetify に関するファイルはスタブ化しておく
config.global.stubs["v-row"] = StubComponent;
config.global.stubs["v-col"] = StubComponent;

beforeEach(() => {
  // テストの度にモックの実装をクリアする
  vi.clearAllMocks();
});
