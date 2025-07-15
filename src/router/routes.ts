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
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Não Encontrado',
        component: () => import("@/views/Error.vue"),
        props: {
            errorCode: '404',
            errorTitle: 'Página Não Encontrada',
            errorDescription: 'Oops! A página que você tentou acessar não existe ou foi movida. Verifique o endereço e tente novamente.'
        },
        meta: { hideLayout: true }
    },
]