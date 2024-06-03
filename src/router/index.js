import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CreateGoal from '../views/CreateGoal.vue'
import Income from '../views/SetIncome.vue'
import Expences from '../views/InputExpenses.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView
    },
    {
      path:'/creategoal',
      name:'CreateGoal',
      component:CreateGoal
    },
    {
      path:'/incomes',
      name:'Incomes',
      component : Income
    },
    {
      path:'/expences',
      name:'Expences',
      component : Expences
    },
    
  ]
})

export default router
