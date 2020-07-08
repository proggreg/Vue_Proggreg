<template>
  <v-row>
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-card
          class="ma-4 pa-8 card primary"
          hover
          v-for="n in 10"
          :key="n"
          outlined
          ripple
          min-width="20%"
        >{{n}}</v-card>
      </v-row>
    </v-col>
  </v-row>
</template>
<style >
.card {
  text-align: center;
}

.itsactive {
  background-color: pink;
}
</style>