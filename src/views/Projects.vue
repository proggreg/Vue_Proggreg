/* eslint-disable vue/require-v-for-key */
<template>
  <div>

     <!-- <ol>
    <li  v-for="project in projects" :key='project.title'>
          <router-link v-bind:to="project.routerlink">
          <img src="../assets/snakegame.jpg">  
          </router-link>
    </li>
  </ol> -->
  </div>
</template>

<script>

export default {
  name: 'ProjectsContainer',
  components: {
  },
  mounted() {
    
  },
  data:function() {
    return  {
      projects:[
        { title: 'Snake Game',
        routerlink: '/snakegame' }
      ]
    }
  }
}


// var p5canvas = p5.createCanvas(600,600);
// p5canvas.parent('myContainer');



</script>
<style scoped>
  ol {
    list-style-type: none;
    color:black;
  }
</style>