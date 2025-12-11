import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
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
        component: PostPage,
        meta: { requiresAuth: true }
    },
    {
        path: '/Addpost',
        name: 'AddPost',
        component: AddpostPage,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Route guard to protect routes that require auth
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user) {
        next('/Login')
        alert("You must be logged in to access this page.")
    } else {
        next()
    }
})

export default router