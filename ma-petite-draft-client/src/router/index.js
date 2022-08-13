import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Draft from '../views/Draft.vue'
import Wish from '../views/Wish.vue'
import Login from "../views/Login.vue"
import SignUp from "../views/SignUp.vue"
import ForgotPassword from '../views/ForgotPassword.vue'
//import Account from '../views/Account.vue'
import DraftManagement from "../views/DraftManagement.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false,
      title: ' - Home'
    }
  },
  {
    path: '/draft',
    name: 'draft',
    component: Draft,
    meta: {
      auth: false,
      title: ' - Draft'
    }
  },
  {
    path: '/wish',
    name: 'wish',
    component: Wish,
    meta: {
      auth: false,
      title: ' - Wish'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: false,
      title: '- Home'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false,
      title: ' - Login'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgotpassword',
    component: ForgotPassword,
    meta: {
      auth: false,
      title: ' - Forgot Password'
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    meta: {
      auth: false,
      title: ' - Sign Up'
    }
  },
  {
    path: '/draft_management',
    name: 'draftmanagement',
    component: DraftManagement,
    meta: {
      auth: false,
      title: ' - Draft Management'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
