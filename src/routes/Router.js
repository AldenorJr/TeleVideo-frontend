import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;