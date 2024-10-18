import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserProfileView from "../views/UserProfileView.vue"
import AdminView from "../views/AdminView.vue"
import AddUserView from "../views/AddUserView.vue"
import EditUserView from "../views/EditUserView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  // {
  //   path: "/logout",
  //   name: "home",
  //   component: HomeView,
  // },
  {
    path: "/user-profile",
    name: "UserProfileView",
    component: UserProfileView,
    // props: route => ({ loggedInUser: route.params.loggedInUser })
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
    path: "/dashboard",
    name: "AdminView",
    component: AdminView,
  },
  {
    path: "/add-user",
    name: "AddUserView",
    component: AddUserView,
  },
  {
    path: "/edit-user",
    name: "EditUserView",
    component: EditUserView,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
