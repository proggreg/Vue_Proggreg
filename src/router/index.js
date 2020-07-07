import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";
// import ProjectsGrid from '../components/ProjectsGrid.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/ProjectsGrid",
    name: "ProjectsGrid",
    component: () =>
      import(
        /* webpackChunkName: "projectsgrid" */ "../components/ProjectsGrid.vue"
      ),
  },
];

const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes,
});

export default router;
