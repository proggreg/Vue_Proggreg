<template>
  <v-card style="width: 70%; height: 80%; margin: 0 auto;">
    <v-form @submit.prevent style="width: 90%; height: 100%;margin: 0 auto;">
      <v-text-field></v-text-field>
      <v-text-field></v-text-field>
      <v-text-field></v-text-field>
      <v-btn
        class="mr-4"
        @click="submit"
        style="display: flex; margin: auto auto 0 auto !important; background-color:blue; color: white"
      >Send</v-btn>
    </v-form>
  </v-card>
</template>
<style scoped>
/* v-form {
  width: 80%;
} */
</style>