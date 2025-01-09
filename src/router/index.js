import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            alias: '/home/:id',
            props: true,
            component: () => import('../views/Home.vue'),
            
        },
        {
            path: '/add-book',
            alias: '/edit-book/:id',
            props: true,
            component: () => import('../views/Form.vue')
        },
        {
            path: '/cart',
            component: () => import('../views/Cart.vue')
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/NotFound.vue')
        }
        
    ]
});

export default router;