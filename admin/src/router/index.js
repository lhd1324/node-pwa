import Vue from 'vue'
import Router from 'vue-router'
import listnav from '@/components/listnav'
import adminav from '@/components/adminav'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listnav',
      component: listnav
    },
    {
      path: '/adminav',
      name: 'adminav',
      component: adminav
    },
  ]
})
