import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import userManagement from '../components/userManagement.vue'
import dynamicManagement from '../components/dynamicManagement.vue'
import reportingInformation from '../components/reportingInformation.vue'





Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: 'login' },
    { path: '/login', component: login, name: 'login' },
    {
        path: '/home',
        component: home,
        redirect: '/userManagement',
        children: [
            {
                path: '/userManagement',
                component: userManagement,
            },
            {
                path: '/dynamicManagement',
                component: dynamicManagement,
            },
            {
                path: '/reportingInformation',
                component: reportingInformation,
            },
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router