import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdmistracionView from '../views/AdmistracionView.vue'
import { currentUserPromise } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      auth: true
    }
  },
  {
    path: '/administracion',
    name: 'administracion',
    component: AdmistracionView,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {

  const requireAuth = to.meta.auth
  const user = await currentUserPromise()

  if (requireAuth) {
    if (user) {

      next();
    } else {
      console.log("no existe el usuario")
      next("/login")
    }
  } else {
    next()
  }
})

export default router
