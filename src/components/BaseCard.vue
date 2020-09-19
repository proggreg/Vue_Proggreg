<template>
  <v-card
    :to="to"
    class="rounded-xl topbar"
    :style="{width: cardWidth, height: cardHeight, padding: padding}"
  >
    <v-icon
      v-if="collapsible"
      style="background: none;"
      :class="[hide ? 'showBtn' : 'hideBtn',iconRight ? 'right' : 'left']"
      @click="hideShow()"
    >{{plusMinusIcon}}</v-icon>
    <v-layout v-if="title != ''" justify-center>
      <v-card-title
        id="cardTitle"
        class="primary--text font-weight-bold pa-0"
        v-if="!hide || keepTitle"
      >{{title}}</v-card-title>
    </v-layout>
    <v-layout v-if="!hide" justify-center align-center>
      <!-- component injected here -->
      <slot></slot>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "BaseCard",
  props: ["title", "collapsible", "keepTitle", "iconRight", "to"],
  methods: {
    hideShow: function () {
      this.$emit("hideShow", this.hide);
      if (this.hide) {
        this.plusMinusIcon = "mdi-minus-box-outline";
        this.cardWidth = "100%";
        this.cardHeight = "100%";
        this.hideShowClass = "hideBtn";
        this.padding = "16px";
      } else {
        this.plusMinusIcon = "mdi-plus-box-outline";
        this.padding = "0px";

        if (this.keepTitle) {
          this.cardWidth =
            parseInt(
              getComputedStyle(document.getElementById("cardTitle")).width
            ) +
            24 +
            7 +
            70 +
            "px";
        } else {
          this.cardWidth = "40px";
        }
        this.cardHeight = "40px";
        this.hideShowClass = "showBtn";
      }
      this.hide = !this.hide;
    },
  },
  data() {
    return {
      plusMinusIcon: "mdi-minus-box-outline",
      cardWidth: "100%",
      cardHeight: "100%",
      padding: "16px",
      hide: false,
      cardTitle: this.title ? this.title : "",
    };
  },
};
</script>

<style scoped>
.hideBtn {
  margin-top: 10px;
}
.left {
  float: left;
  margin-left: 7px;
}

.right {
  float: right;
  margin-right: 7px;
}
.showBtn {
  margin-top: 7px;
}
</style>