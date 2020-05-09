import Vue from 'vue'
import VueRouter from 'vue-router'
import Rhymesaurus from '@/views/Rhymesaurus'
import Associated from '@/views/Associated'

Vue.use(VueRouter)

const routes = [
  {
    path: '/rhymesaurus',
    name: 'Rhymesaurus',
    component: Rhymesaurus
  },
  {
    path: '/associated',
    name: 'Associated',
    component: Associated
  }
]

const router = new VueRouter({
  routes
})

export default router
