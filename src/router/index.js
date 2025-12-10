import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignupPage from '../views/SignupPage.vue'
import LoginPage from '../views/LoginPage.vue'
import ContactPage from '../views/ContactPage.vue'
import PostPage from '../views/PostPage.vue'
import AddpostPage from '../views/AddpostPage.vue'

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
        path: '/Login',
        name: 'Login',
        component: LoginPage
    },

    {
        path: '/ContactUs',
        name: 'ContactUs',
        component: ContactPage
    },
    {
        path: '/Post/:id',
        name: 'Post',
        component: PostPage
    },
    {
        path: '/Addpost',
        name: 'AddPost',
        component: AddpostPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router