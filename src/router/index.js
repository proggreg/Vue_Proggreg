import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home"
  },
  {
    path: '/Projects',
    name: "Projects",
    component: () =>
      import(
        /* webpackChunkName: "projectsgrid" */
        "../components/ProjectsGrid.vue"
      ),
  },
  {
    path: "/AboutMe",
    name: "AboutMe",
    component: () =>
      import(
        /* webpackChunkName: "aboutme" */
        "../components/AboutMe.vue"
      ),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () =>
      import(
        /* webpackChunkName: "contact" */
        "../components/Contact.vue"
      ),
  },
  {
    path: "/Snake",
    name: "Snake",
    component: () =>
      import(
        /* webpackChunkName: "snake" */
        "../Projects/Snake/SnakeGame.vue"
      ),
  },
  {
    path: "/TwitterBot",
    name: "TwitterBot",
    component: () =>
      import(
        /* webpackChunkName: "twitterbot" */
        "../Projects/TwitterBot/TwitterBot.vue"
      ),
  }, {
    path: "/Synth",
    name: "Synth",
    component: () =>
      import(
        /* webpackChunkName: "synth" */
        "../Projects/Synth/Synth.vue"
      ),
  }
];

const router = new VueRouter({
  routes
});

export default router;