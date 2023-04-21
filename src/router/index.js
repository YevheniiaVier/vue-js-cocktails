import { createRouter, createWebHistory } from "vue-router";

import DefaultLayout from "../components/DefaultLayout.vue";
import GuestLayout from "../components/GuestLayout.vue";

const LoginView = () => import("../views/LoginView.vue");
const HomeView = () => import("../views/HomeView.vue");
const ErrorView = () => import("../views/ErrorView.vue");
const CocktailsByNameView = () => import("../views/CocktailsByNameView.vue");
const IngredientsView = () => import("../views/IngredientsView.vue");
const CocktailItemView = () => import("../views/CocktailItemView.vue");
const RegisterView = () => import("../views/RegisterView.vue");

import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/by-name/:name?",
          name: "byName",
          component: CocktailsByNameView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/ingredients",
          name: "ingredients",
          component: IngredientsView,
        },

        {
          path: "/cocktail/:id",
          name: "cocktail",
          component: CocktailItemView,
        },
      ],
    },
    {
      path: "/guest",
      component: GuestLayout,
    },
    {
      path: "/login",
      name: "login-page",
      component: LoginView,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: "/register",
      name: "register-page",
      component: RegisterView,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "error-page",
      component: ErrorView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: "login-page" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (isLoggedIn) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
