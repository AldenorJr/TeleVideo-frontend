import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Perfil from '@/pages/Perfil'
import Produtos from '@/pages/Produtos'

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
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: Perfil
    },
    {
        path: '/produtos',
        name: 'produtos',
        component: Produtos
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;