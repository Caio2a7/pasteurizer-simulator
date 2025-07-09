import { type RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Inicio',
        component: () => import("@/views/Home.vue")
    },
    {
        path: '/sobre',
        name: 'Sobre',
        component: () => import("@/views/About.vue")
    },
    {
        path: '/tech',
        name: 'Tecnologias',
        component: () => import('@/views/Tech.vue')
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: () => import('@/views/Faq.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Não Encontrado',
        component: () => import("@/views/404.vue")
    },
]