import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
  },
  {
    path: "/ProjectsGrid",
    name: "ProjectsGrid",
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