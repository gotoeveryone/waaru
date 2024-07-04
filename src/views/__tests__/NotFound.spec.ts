import { shallowMount } from "@vue/test-utils";
import Component from "@/views/NotFound.vue";

describe("NotFound", () => {
  it("「ページが見つかりません」が表示される", () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.text()).toContain("ページが見つかりません");
  });
});
