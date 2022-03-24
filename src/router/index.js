import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";
import Login from "../views/auth/AuthLogin.vue";
import Register from "../views/auth/AuthRegister.vue";
import firebaseApp from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "dashboard/home",
    component: () => import("@/layouts/DashboardLayout"),
    children: [
      // Components
      {
        name: "Alerts",
        path: "pages/alerts",
        component: () => import("@/views/dashboard/DashboardAlerts"),
      },

      {
        name: "Profile",
        path: "pages/profile",
        component: () => import("@/views/dashboard/DashboardProfile"),
      },

      {
        name: "Icons",
        path: "pages/icons",
        component: () => import("@/views/dashboard/DashboardIcons"),
      },

      {
        name: "TableSimple",
        path: "pages/tables-simple",
        component: () => import("@/views/dashboard/DashboardTableSimple"),
      },
      {
        name: "DashboardTest",
        path: "dashboard/test",
        component: () => import("@/views/dashboard/DashboardTest"),
      },
      {
        name: "Dashboard",
        path: "dashboard/home",
        component: HomeView,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(requiresAuth);
  console.log(await firebaseApp.getCurrentUser());

  if (
    (to.path === "/login" || to.path === "/register") &&
    (await firebaseApp.getCurrentUser())
  ) {
    next("/");
  } else if (requiresAuth && !(await firebaseApp.getCurrentUser())) {
    next("login");
  } else {
    next();
  }
});

export default router;
