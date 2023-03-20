import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/quiz',
        name: 'quiz',
        component: () => import('../views/Quiz.vue'),
    },
    {
        path: '/end',
        name: 'end',
        component: () => import('../views/End.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router