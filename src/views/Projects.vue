

/* eslint-disable vue/require-v-for-key */
<template>
  <div>

    <h2>
      My Projects
    </h2>
    <v-container>
      <v-row>
      <v-col >
        <router-link v-for="project in projects" :key='project.img' :to="project.routerlink">
            
          <!-- <img :src="project.img" style="width:100px;height:100px;"> -->

          <!-- //TODO -->
          <img width="100px" height="100px" src="../assets/snakegame.jpg">  
        </router-link>
      </v-col>
      </v-row>

      <!-- <ol>
        <li  v-for="project in projects" :key='project.title'>
              <router-link v-bind:to="project.routerlink">
              <img width="100px" height="100px" src="../assets/snakegame.jpg">  
              </router-link>
        </li>
      </ol>  -->
          </v-container>
     
  </div>
</template>

<script>
// import { default as hello} from '../js/script.js';
// import * as p5 from 'p5';

export default {
  name: 'ProjectsContainer',
  components: {
  },
  mounted() {
    
  },
  created() {
    
  },
  data:function() {
    return  {
      projects:[
        { title: 'Snake Game',
        routerlink: '/snakegame',
        img:'../img/logo.svg'
        }
      ]
    }
  },
  methods: {
    setup: function() {
    
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