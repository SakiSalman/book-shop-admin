import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/pages/Login.vue';
import Dashboard from '@/pages/Dashboard.vue';
import { useGuard } from '@/composables';
import SalesDasboard from '@/pages/SalesDasboard.vue';
import ProductList from '@/pages/Products/ProductList.vue';
import EditProduct from '@/pages/Products/edit/EditProduct.vue';
import AddProduct from '@/pages/Products/add/AddProduct.vue';
import ProductDetails from '@/pages/Products/product-details/ProductDetails.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/', component: Dashboard, beforeEnter: useGuard },
    { path: '/sales-dashboard', component: SalesDasboard, beforeEnter: useGuard },
    { path: '/products', component: ProductList, beforeEnter: useGuard },
    { path: '/products/edit/:id', component: EditProduct, beforeEnter: useGuard },
    { path: '/products/add', component: AddProduct, beforeEnter: useGuard },
    { path: '/product-details/:id', component: ProductDetails, beforeEnter: useGuard },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;