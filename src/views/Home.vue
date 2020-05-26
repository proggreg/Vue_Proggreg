<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>
<script>



export default {
  name: 'Home',
  created() {
  },
  components: {

  },
  mounted() {
    this.$loadScript("../js/script.js")
    .then(() => { 
      this.sayHello();
    })
    .catch((err) => {
      console.log(err);
    }),
    this.$loadScript("../js/snake.js")
    .then(() => { 
      console.log('script loaded');
    })
    .catch((err) => {
      console.log(err);
    }),this.$loadScript("../js/levels.js")
    .then(() => { 
      console.log('script loaded');
    })
    .catch((err) => {
      console.log(err);
    });
  }

}

</script>

<style scoped>

</style>