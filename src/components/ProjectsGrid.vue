<template>
  <div class="projectsContainer">
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-card
            class="ma-10 pa-12 card primary"
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
  </div>
</template>
<style >
.projectsContainer {
  height: 80%;
}

.card {
  text-align: center;
}

.itsactive {
  background-color: pink;
}
</style>