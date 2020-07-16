import Vue from "vue";
import VueRouter from "vue-router";
import ProjectsGrid from '../components/ProjectsGrid.vue';

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
  },
  {
    path: "/ProjectsGrid",
    name: "ProjectsGrid",
    component: ProjectsGrid
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
];

const router = new VueRouter({
  routes
});

export default router;