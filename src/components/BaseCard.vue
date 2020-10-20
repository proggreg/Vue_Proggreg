<template>
  <v-card
    :to="to"
    class="rounded-xl topbar"
    :style="{ width: cardWidth, height: cardHeight, padding: padding }"
  >

    <v-layout class="pa-0 ma-0 fill-height" column justify-center align-center>
      <v-card-title
        id="cardTitle"
        style="font-size: 2em; user-select: none"
        class="primary--text text-center font-weight-bold pa-0"
        v-if="!hide || keepTitle"
        >{{ title }}</v-card-title
      >

      <v-layout
        class="fill-height"
        style="min-width: 100%"
        v-if="!hide"
        justify-center
        align-center
      >
        <!-- component injected here -->
        <slot />
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
    },
    to: {
      type: String,
    },
  },


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