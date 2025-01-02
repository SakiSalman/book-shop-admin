import { createRouter, createWebHistory } from 'vue-router';
import { useGuard, useGuestGuard } from '@/composables/guards/useAuthGuard';
import Dashboard from '@/pages/Dashboard/Dashboard.vue';
import SalesDasboard from '@/pages/Dashboard/SalesDasboard.vue';
import ProductList from '@/pages/Products/ProductList.vue';
import EditProduct from '@/pages/Products/edit/EditProduct.vue';
import AddProduct from '@/pages/Products/add/AddProduct.vue';
import ProductDetails from '@/pages/Products/product-details/ProductDetails.vue';
import Login from '@/pages/auth/Login.vue';
import ForgotPassword from '@/pages/auth/ForgotPassword.vue';
import ResetPassword from '@/pages/auth/ResetPassword.vue';
import AppSettings from '@/pages/CMS/AppSettings/AppSettings.vue';

const routes = [
    { path: '/login', component: Login, beforeEnter: useGuestGuard },
    { path: '/forgot-password', component: ForgotPassword, beforeEnter: useGuestGuard },
    { path: '/reset-password', component: ResetPassword, beforeEnter: useGuestGuard },
    { path: '/', component: Dashboard, beforeEnter: useGuard },
    { path: '/sales-dashboard', component: SalesDasboard, beforeEnter: useGuard },
    { path: '/products', component: ProductList, beforeEnter: useGuard },
    { path: '/products/edit/:id', component: EditProduct, beforeEnter: useGuard },
    { path: '/products/add', component: AddProduct, beforeEnter: useGuard },
    { path: '/product-details/:id', component: ProductDetails, beforeEnter: useGuard },

    // CMS ROUTES

    { path: '/cms/app-settings', component: AppSettings, beforeEnter: useGuard },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;