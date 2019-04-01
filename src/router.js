import Vue from 'vue'
import Router from 'vue-router'
import TableComp from './pages/Table.vue'
import MapComp from './pages/Map.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table',
      component: TableComp
    },
    {
      path: '/map',
      name: 'map',
      component: MapComp
    },
  ]
})
