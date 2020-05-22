/* eslint-disable vue/require-v-for-key */
<template>
  <div>

     <ol>
    <li  v-for="project in projects" :key='project.title'>
          <router-link v-bind:to="project.routerlink">
          <img src="../assets/snakegame.jpg">  
          </router-link>
      <!-- <a v-bind:href="project.href"> {{project.title}} -->
      <!-- </a> -->
    </li>
  </ol>
  </div>
</template>

<script>


export default {
  name: 'ProjectsContainer',

data:function() {
    return  {
      projects:[
        { title: 'Snake Game',
        routerlink: '/snakegame' }
      ]
    }
  }
}

</script>
<style scoped>
  ol {
    list-style-type: none;
    color:black;
  }
</style>