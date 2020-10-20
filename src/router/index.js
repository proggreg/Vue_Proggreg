import Vue from "vue";
import VueRouter from "vue-router";
import TheProjectsGrid from "../components/TheProjectsGrid.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: TheProjectsGrid
  },
  {
    path: "/AboutMe",
    name: "AboutMe",
    component: () =>
      import(
        /* webpackChunkName: "aboutme" */
        "../views/AboutMe.vue"
      ),
  },
  {
    path: "/Contact",
    name: "Contact",
    component: () =>
      import(
        /* webpackChunkName: "contact" */
        "../views/Contact.vue"
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
  mode: 'history',
  routes
});

export default router;