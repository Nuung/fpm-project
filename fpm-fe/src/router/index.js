import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/components/main/MainPage.vue'
import SignIn from '@/components/login/SignIn.vue'
import ChallengeMain from '@/components/challenge/ChallengeMain.vue'
import UserProfile from '@/components/profile/UserProfile.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: SignIn,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/challenge',
    name: 'challenge',
    component: ChallengeMain,
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.name !== 'signIn') {
    if(store.state.authToken === '' && to.meta.requireAuth){
      next({name:'signIn'});
    }
    else
      next();
  }
  else
    next();
})

export default router
