import Vue from "vue";

export default Vue.extend({
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
