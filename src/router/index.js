import Vue from 'vue'
import Router from 'vue-router'
import UnRewards from '@/components/UnRewards'
import BeRewards from '@/components/BeRewards'
import CreateGuess from '@/components/CreateGuess'
import Help from '@/components/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/unrewards'
    },
    {
      path: '/unrewards',
      name: 'UnRewards',
      component: UnRewards
    },
    {
      path: '/berewards',
      name: 'BeRewards',
      component: BeRewards
    },
    {
      path: '/createguess',
      name: 'CreateGuess',
      component: CreateGuess
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
