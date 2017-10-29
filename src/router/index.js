import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Meetups from '@/components/Meetup/Meetups'
import CreateMeetup from '@/components/Meetup/CreateMeetup'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Meetup from '@/components/Meetup/Meetup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/Meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/Meetup/:id',
      name: Meetup,
      props: true,
      component: Meetup
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
