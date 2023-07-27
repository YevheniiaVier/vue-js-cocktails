import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';

const LoginView = () => import('../views/LoginView.vue');
const HomeView = () => import('../views/HomeView.vue');
const ErrorView = () => import('../views/ErrorView.vue');
const CocktailsByNameView = () => import('../views/CocktailsByNameView.vue');
const MyPageView = () => import('../views/MyPageView.vue');
const CocktailItemView = () => import('../views/CocktailItemView.vue');
const RegisterView = () => import('../views/RegisterView.vue');
const FavoriteView = () => import('../views/FavoritView.vue');
const MyDrinksView = () => import('../views/MyDrinksView.vue');
const AddDrinkView = () => import('../views/AddDrinkView.vue');
const EditDrinkView = () => import('../views/EditDrinkView.vue');
const CocktailsByLetterView = () =>
  import('../views/CocktailsByLetterView.vue');
const CocktailsByFilterView = () => import('../views/CocktailsByFilterView.vue');
const IngredientItemView = () => import('../views/IngredientItemView.vue');



import store from '../store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/by-name',
          name: 'byName',
          component: CocktailsByNameView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/by-letter/:letter',
          name: 'by-letter',
          component: CocktailsByLetterView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/my-page',
          name: 'my-page',
          component: MyPageView,
          meta: {
            requiresAuth: true,
          },
          redirect: '/my-drinks',
          children: [
            {
              path: '/favorites',
              name: 'favorites',
              component: FavoriteView,
            },
            {
              path: '/my-drinks',
              name: 'my-drinks',
              component: MyDrinksView,
            },
            {
              path: '/add-drink',
              name: 'add-drink',
              component: AddDrinkView,
            },
            {
              path: '/edit-drink/:id',
              name: 'edit-drink',
              component: EditDrinkView,
            },
          ],
        },

        {
          path: '/cocktail/:id',
          name: 'cocktail',
          component: CocktailItemView,
        },
        {
          path: '/ingredient/:id',
          name: 'ingredient',
          component: IngredientItemView,
        },
        {
          path: '/by-filter/:filter',
          name: 'by-filter',
          component: CocktailsByFilterView, 
        },
      ],
    },
    {
      path: '/guest',
      component: GuestLayout,
    },
    {
      path: '/login',
      name: 'login-page',
      component: LoginView,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: '/register',
      name: 'register-page',
      component: RegisterView,
      meta: {
        hideForAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)*',
      name: 'error-page',
      component: ErrorView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn'];

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ name: 'login-page', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.hideForAuth)) {
    if (isLoggedIn) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.path.startsWith('/my-page'))) {
    if (!isLoggedIn) {
      next({ name: 'login-page', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
