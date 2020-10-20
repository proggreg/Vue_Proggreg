import Vue from 'vue'
import Vuex from 'vuex'
import SnakeGame from './modules/SnakeGame'
import Contact from './modules/Contact'
import AboutMe from './modules/AboutMe'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    SnakeGame,
    Contact,
    AboutMe
  }
})