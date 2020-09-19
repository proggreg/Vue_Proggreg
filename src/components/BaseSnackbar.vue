<template>
  <!-- TODO fix mutating props error -->
  <!-- TODO layout and font-size/weight, size customization -->
  <v-snackbar rounded content-class="primary--text" v-model="show" color="topbar">{{message}}</v-snackbar>
</template>

<script>
export default {
  name: "BaseSnackBar",
  props: {
    show: {
      required: true,
      type: Boolean,
    },
    message: {
      required: true,
      type: [String, Number],
    },
  },
  data() {
    return {
      something: this.show,
    };
  },
};
</script>

