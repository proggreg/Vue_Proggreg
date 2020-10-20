<template>
  <v-layout>
    <h3>Weather: {{currentWeather}} Country: {{country}}</h3>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "Weather",
  mounted() {
    this.getGeolocation();
  },
  methods: {
    getGeolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getCurrentWeather);
      } else {
        // Not Supported
      }
    },
    async getCurrentWeather(position) {
      let url = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e9413c5f4f957d95a56ee97f966e1032`;

      axios
        .get(url)
        .then((res) => {
          this.currentWeather = res.data.weather[0].main;
          this.country = res.data.sys.country;
        })
        .catch((err) => console.log(err));
    },
  },
  data() {
    return {
      currentWeather: "",
      country: "",
    };
  },
};
</script>

<style scoped lang="scss">
</style>