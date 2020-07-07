<template>
  <div id="scoreboard">
    <form>
      <span>
        <input v-model.trim="newusername" placeholder="username" />
        <input type="submit" />
      </span>
    </form>

    <h2>Scores</h2>
    <ol>
      <li v-for="user in users" :key="user.username">{{user.username + ' '+ user.score}}</li>
    </ol>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        { username: "greggy", score: 1000 },
        { username: "greggy", score: 10 },
        { username: "ellen", score: 0 }
      ],
      newusername: ""
    };
  }
};
</script>
<style scoped>
/* h2 {
    color: white;
    font-size: 40px;
  }
  li {
    color: white;
  }

  #scoreboard {
    background-color: black;
    width: 100%;
    height:100%;
    display: inline-block;
    position: relative;
  }

  form {
    background-color: blueviolet;
    color: yellow;
    font-weight: 800;
    font-size: 2rem;
  } */
</style>