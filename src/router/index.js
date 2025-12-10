import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignupPage from '../views/SignupPage.vue'
import ContactPage from '../views/ContactPage.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: MainPage
    },
    {
        path: '/Signup',
        name: 'SignUp',
        component: SignupPage
    },
    {
        path: '/ContactUs',
        name: 'ContactUs',
        component: ContactPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router