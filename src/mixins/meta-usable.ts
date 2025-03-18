import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    title() {
      return "";
    },
  },
  mounted() {
    document.title = `${this.title} - Waaru`;
  },
  updated() {
    document.title = `${this.title} - Waaru`;
  },
});
