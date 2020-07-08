<template>
  <v-form @submit.prevent>
    <v-text-field placeholder="Name"></v-text-field>
    <v-text-field placeholder="Email"></v-text-field>
    <v-text-field placeholder="Message"></v-text-field>
    <v-btn
      class="mr-4 primary"
      @click="submit"
      style="display: flex; margin: auto auto 0 auto !important; "
    >Send</v-btn>
  </v-form>
</template>
